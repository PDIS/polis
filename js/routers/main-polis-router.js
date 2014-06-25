var RootView = require("../views/root");
var Backbone = require("backbone");
var ConversationModel = require("../models/conversation");
var ParticipantModel = require("../models/participant");
var bbFetch = require("../net/bbFetch");
var ConversationsCollection = require("../collections/conversations");
var FaqCollection = require("../collections/faqs");
var FaqContent = require("../faqContent");
var InboxView = require("../views/inbox");
var HomepageView = require("../views/homepage");
var CreateConversationFormView = require("../views/create-conversation-form");
var ConversationDetailsView = require("../views/conversation-details");
var ConversationGatekeeperView = require("../views/conversationGatekeeperView");
var ConversationGatekeeperViewCreateUser = require("../views/conversationGatekeeperViewCreateUser");
var ParticipationView = require("../views/participation");
var ExploreView = require("../views/explore");
var CreateUserFormView = require("../views/create-user-form");
var EmptyView = require("../views/empty-view");
var LoginFormView = require("../views/login-form");
var LandingPageView = require("../views/landing-page");
var metric = require("../util/metric");
var ModerationView = require("../views/moderation");
var PasswordResetView = require("../views/passwordResetView");
var PasswordResetInitView = require("../views/passwordResetInitView");
var ShareLinkView = require("../views/share-link-view");
var SummaryView = require("../views/summary.js");
var PlanUpgradeView = require("../views/plan-upgrade");
var FaqView = require("../views/faq");
var PolisStorage = require("../util/polisStorage");
var UserModel = require("../models/user");
var _ = require("underscore");
var $ = require("jquery");

function authenticated() { return PolisStorage.uid(); }

// TODO refactor this terrible recursive monster function.
function doJoinConversation(onSuccess, sid, zinvite, singleUse) {
  var that = this;

  var suzinvite;
  if (singleUse) {
    suzinvite = zinvite;
  }

  var uid = PolisStorage.uid();

  if (!uid) {
      console.log("trying to load conversation, but no auth");
      // Not signed in.
      // Or not registered.

      if (singleUse) {

        $.ajax({
          url: "/v3/joinWithInvite",
          type: "POST",
          dataType: "json",
          xhrFields: {
              withCredentials: true
          },
          // crossDomain: true,
          data: {
            sid: sid,
            suzinvite: suzinvite
          }
        }).then(function(data) {
          that.participationView(sid);
        }, function(err) {
          if (err.responseText === "polis_err_no_matching_suzinvite") {
            alert("Sorry, this single-use URL has been used.");
          } else {
            that.conversationGatekeeper(sid, suzinvite, singleUse).done(function(ptptData) {
              doJoinConversation.call(that, onSuccess, sid);
            });
          }
        });
      } else if (sid) {
        // Don't require user to explicitly create a user before joining the conversation.
        $.ajax({
          url: "/v3/joinWithInvite",
          type: "POST",
          dataType: "json",
          xhrFields: {
              withCredentials: true
          },
          // crossDomain: true,
          data: {
            sid: sid
          }
        }).then(function(data) {
          that.participationView(sid);
        }, function(err) {
          that.conversationGatekeeper(sid, zinvite).done(function(ptptData) {
            doJoinConversation.call(that, onSuccess, sid);
          });
        });
      } else {
        alert("missing conversation ID in URL. Shouldn't hit this.");
        // this.doCreateUserFromGatekeeper(sid, zinvite, singleUse).done(function() {
        //   // Try again, should be ready now.
        //   doJoinConversation.call(that, onSuccess, sid, zinvite);
        // });


        // !!!!!!!!!!TEMP CODE - JOIN WITHOUT A ZINVITE!!!!!
        // Don't require user to explicitly create a user before joining the conversation.
        $.ajax({
          url: "/v3/joinWithInvite",
          type: "POST",
          dataType: "json",
          xhrFields: {
              withCredentials: true
          },
          // crossDomain: true,
          data: {
            sid: sid,
            // zinvite: zinvite
          }
        }).then(function(data) {
          that.participationView(sid);
        }, function(err) {
          that.conversationGatekeeper(sid).done(function(ptptData) {
            doJoinConversation.call(that, onSuccess, sid);
          });
        });

      }
  } else {
    var params = {
      sid: sid,
    };
    if (singleUse) {
      params.suzinvite = suzinvite;
    } else {
      params.zinvite = zinvite;
    }

    if (singleUse) {
      // join conversation (may already have joined)
      var ptpt = new ParticipantModel(params);
      ptpt.save().then(function() {
        // Participant record was created, or already existed.
        // Go to the conversation.
        onSuccess(ptpt);
      }, function(err) {
        $.ajax({
          url: "/v3/joinWithInvite",
          type: "POST",
          dataType: "json",
          xhrFields: {
              withCredentials: true
          },
          // crossDomain: true,
          data: {
            sid: sid,
            suzinvite: suzinvite
          }
        }).then(function(data) {
          doJoinConversation.call(that, onSuccess, sid);
        }, function(err) {
          if (err.responseText === "polis_err_no_matching_suzinvite") {
            alert("Sorry, this single-use URL has been used.");
          } else {
            that.conversationGatekeeper(sid, suzinvite, singleUse).done(function(ptptData) {
              doJoinConversation.call(that, onSuccess, sid);
            });
          }
        });
      });
    } else {
      // join conversation (may already have joined)
      var ptpt = new ParticipantModel(params);
      ptpt.save().then(function() {
        // Participant record was created, or already existed.
        // Go to the conversation.
        onSuccess(ptpt);
      }, function(err) {
        that.conversationGatekeeper(sid, zinvite).done(function(ptptData) {
          doJoinConversation.call(that, onSuccess, sid, zinvite);
        });
      });
    }
  }
  //  else {
  //   // Found a pid for that sid.
  //   // Go to the conversation.
  //   that.doLaunchConversation(sid);
  // }

}


var polisRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.r("homepage", "homepageView");
    this.r("conversation/create", "createConversation");
    this.r("conversation/view/:id(/:zinvite)", "participationView");
    this.r("user/create", "createUser");
    this.r("user/login", "login");
    this.r("settings", "deregister");
    this.r("plan/upgrade(/:plan_id)", "upgradePlan");
    this.r("inbox(/:filter)", "inbox");
    this.r("faq", "faq");
    this.r("pwresetinit", "pwResetInit");
    this.r("prototype", "prototype");
    this.r("", "landingPageView");



    // backwards compatibility TODO remove after July 2014
    this.r(/([0-9]+)/, "participationViewDeprecated");  // zid
    this.r(/([0-9]+)\/(.*)/, "participationViewDeprecated"); // zid/zinvite
    this.r(/m\/([0-9]+)/, "moderationViewDeprecated");  // m/zid
    this.r(/m\/([0-9]+)\/(.*)/, "moderationViewDeprecated"); // m/zid/zinvite
    // end backwards compatibility routes

    this.r(/([0-9][0-9A-Za-z]+)$/, "participationView");  // sid
    this.r(/^ot\/([0-9][0-9A-Za-z]+)\/(.*)/, "participationViewWithSuzinvite"); // ot/sid/suzinvite
    this.r(/^pwreset\/(.*)/, "pwReset");
    this.r(/^demo\/([0-9][0-9A-Za-z]+)/, "demoConversation");

    this.r(/explore\/([0-9][0-9A-Za-z]+)$/, "exploreView");  // explore/sid
    this.r(/summary\/([0-9][0-9A-Za-z]+)$/, "summaryView");  // summary/sid
    this.r(/m\/([0-9][0-9A-Za-z]+)$/, "moderationView");  // m/sid
  },
  r: function(pattern, methodToCall) {
    metric("route", methodToCall);
    this.route(pattern, methodToCall);
  },
  bail: function() {
    this.navigate("/", {trigger: true});
  },
  prototype: function() {
    var view = new EmptyView();
    RootView.getInstance().setView(view);
  },
  upgradePlan: function(plan_id) {
    var promise;
    if (!authenticated()) {
      window.planId = plan_id;
      promise = this.doLogin();
    } else {
      if (_.isUndefined(plan_id) && !_.isUndefined(window.plan_id)) {
        plan_id = window.planId;
      }
      promise = $.Deferred().resolve();
    }
    promise.then(function() {
      var userModel = new UserModel();
      bbFetch(userModel).then(function() {
        var view = new PlanUpgradeView({
          model: userModel,
          plan_id: plan_id,
        });
        RootView.getInstance().setView(view);
      });
    });

  },
  landingPageView: function() {
    if (!authenticated()) {
      this.navigate("user/create", {trigger: true});
      // RootView.getInstance().setView(new LandingPageView());
      // RootView.getInstance().setView(new CreateUserFormView({
      //   model : new Backbone.Model({
      //     // zinvite: zinvite,
      //     create: true
      //   })
      // }));
    } else {
      // this.inbox();
      this.navigate("inbox", {trigger: true});
    }
  },
  deregister: function() {
    window.deregister();
  },
  gotoShareView: function(conversationModel) {
    var that = this;
    var shareLinkView = new ShareLinkView({
      model: conversationModel
    });
    shareLinkView.on("done", function() {
      var sid = conversationModel.get("sid");
      var zinvite = conversationModel.get("zinvites")[0];
      var path = sid + (zinvite ? "/" + zinvite : "");
      that.navigate(path, {trigger: true});
    });
    RootView.getInstance().setView(shareLinkView);
  },
  inbox: function(filter){
    if (!authenticated()) { return this.bail(); }
    // TODO add to inboxview init
    // conversationsCollection.fetch({
    //     data: $.param({
    //         is_active: false,
    //         is_draft: false,
    //     }),
    //     processData: true,
    // });
    var filterAttrs = {};
    if (filter) {
      switch(filter) {
        case "closed":
          filterAttrs.is_active = false;
          filterAttrs.is_draft = false;
        break;
        case "active":
          filterAttrs.is_active = true;
        break;
        default:
          filterAttrs.is_active = true;
        break;
      }
    }
    var conversationsCollection = new ConversationsCollection();
    // Let the InboxView filter the conversationsCollection.
    var inboxView = new InboxView($.extend(filterAttrs, {
      collection: conversationsCollection
    }));
    RootView.getInstance().setView(inboxView);
  },
  homepageView: function(){
    var homepage = new HomepageView();
    RootView.getInstance().setView(homepage);
  },
  createConversation: function(){
    if (!authenticated()) { return this.bail(); }
    function onFail(err) {
      alert("failed to create new conversation");
      console.dir(err);
    }
    var that = this;
    conversationsCollection = new ConversationsCollection();

    var model = new ConversationModel({
      is_draft: true,
      is_active: true // TODO think
    });

    model.save().then(function(data) {
      var sid = data[0][0].sid;
      model.set("sid", sid);

      var ptpt = new ParticipantModel({
        sid: sid
      });
      return ptpt.save();
    }).then(function(ptptAttrs) {
      var createConversationFormView = new CreateConversationFormView({
        model: model,
        collection: conversationsCollection,
        pid: ptptAttrs.pid,
        add: true
      });
      that.listenTo(createConversationFormView, "all", function(eventName, data) {
        if (eventName === "done") {
          var suurls = data;
            if (suurls) {
            var suurlsCsv = [];
            var len = suurls.xids.length;
            var xids = suurls.xids;
            var urls = suurls.urls;
            for (var i = 0; i < len; i++) {
              suurlsCsv.push({xid: xids[i], url: urls[i]});
            }
            model.set("suurls", suurlsCsv);
          }
          that.gotoShareView(model);
          // that.navigate("inbox", {trigger: true});
          //that.inbox();
        }
      });
      RootView.getInstance().setView(createConversationFormView);
      $("[data-toggle='checkbox']").each(function() {
        var $checkbox = $(this);
        $checkbox.checkbox();
      });
    }, onFail);
  },
  doLaunchConversation: function(ptptModel) {
    var sid = ptptModel.get("sid");
    var pid = ptptModel.get("pid");
    
    var data = {
      sid: sid
    };

    // Assumes you have a pid already.
    var model = new ConversationModel(data);
    bbFetch(model, {
      data: $.param(data),
      processData: true
    }).then(function() {
      var participationView = new ParticipationView({
        pid: pid,
        model: model
      });
      RootView.getInstance().setView(participationView);
    },function(e) {
      console.error("error loading conversation model", e);
    });
  },

  doLaunchExploreView: function(ptptModel) {
    var sid = ptptModel.get("sid");
    var pid = ptptModel.get("pid");
    
    var data = {
      sid: sid
    };
    // Assumes you have a pid already.
    var model = new ConversationModel(data);
    bbFetch(model, {
      data: $.param(data),
      processData: true
    }).then(function() {
      var exploreView = new ExploreView({
        pid: pid,
        model: model
      });
      RootView.getInstance().setView(exploreView);
    },function(e) {
      console.error("error loading conversation model", e);
    });
  },
  doLaunchSummaryView: function(ptptModel) {
    var sid = ptptModel.get("sid");
    var pid = ptptModel.get("pid");
    
    var data = {
      sid: sid
    };
    // Assumes you have a pid already.
    var model = new ConversationModel(data);
    bbFetch(model, {
      data: $.param(data),
      processData: true
    }).then(function() {
      var view = new SummaryView({
        pid: pid,
        model: model
      });
      RootView.getInstance().setView(view);
    },function(e) {
      console.error("error loading conversation model", e);
    });
  },
  doLaunchModerationView: function(ptptModel) {
    var sid = ptptModel.get("sid");
    var pid = ptptModel.get("pid");
    
    var data = {
      sid: sid
    };
    // Assumes you have a pid already.
    var model = new ConversationModel(data);
    bbFetch(model, {
      data: $.param(data),
      processData: true
    }).then(function() {
      var view = new ModerationView({
        pid: pid,
        model: model
      });
      RootView.getInstance().setView(view);
    },function(e) {
      console.error("error loading conversation model", e);
    });
  },


  demoConversation: function(sid) {
    var ptpt = new ParticipantModel({
      sid: sid,
      pid: -123 // DEMO_MODE
    });

    // NOTE: not posting the model

    this.doLaunchConversation(ptpt);
  },
  participationViewWithSuzinvite: function(sid, suzinvite) {
    window.suzinvite = suzinvite;
    return this.participationView(sid, suzinvite, true);
  },
  exploreView: function(sid, zinvite) {
    doJoinConversation.call(this, 
      this.doLaunchExploreView.bind(this), // TODO
      sid,
      zinvite);
  },
  summaryView: function(sid, zinvite) {
    doJoinConversation.call(this, 
      this.doLaunchSummaryView.bind(this), // TODO
      sid,
      zinvite);
  },

  moderationView: function(sid, zinvite) {
    doJoinConversation.call(this, 
      this.doLaunchModerationView.bind(this), // TODO
      sid,
      zinvite);
  },
  moderationViewDeprecated: function(sid, zinvite) {
    doJoinConversation.call(this, 
      this.doLaunchModerationView.bind(this), // TODO
      zinvite); // maps to sid
  },
  participationView: function(sid, zinvite, singleUse) {

    doJoinConversation.call(this, 
      this.doLaunchConversation.bind(this),
      sid,
      zinvite,
      singleUse);

  },
  participationViewDeprecated: function(zid, zinvite, singleUse) {
    doJoinConversation.call(this, 
      this.doLaunchConversation.bind(this),
      zinvite); // maps to sid now
  },
  
  // assumes the user already exists.
  conversationGatekeeper: function(sid, suzinvite, singleUse) {
    var dfd = $.Deferred();
    var data = {
      sid: sid
    };
    if (singleUse) {
      data.suzinvite = suzinvite
    }
    // Assumes you have a pid already.
    var model = new ConversationModel(data);
    bbFetch(model, {
      data: $.param(data),
      processData: true
    }).then(function() {
      data.model = model;
      var gatekeeperView = new ConversationGatekeeperView(data);
      gatekeeperView.on("done", dfd.resolve);
      RootView.getInstance().setView(gatekeeperView);
    }, dfd.reject);

    return dfd.promise();
  },
  doCreateUserFromGatekeeper: function(sid, zinvite, singleUse) {
    var dfd = $.Deferred();

    var data = {
      create: true, // do we need this?
      sid: sid
    };
    if (singleUse) {
      data.suzinvite = suzinvite
    }
    // Assumes you have a pid already.
    var model = new ConversationModel(data);
    bbFetch(model, {
      data: $.param(data),
      processData: true
    }).then(function() {
      var createUserFormView = new ConversationGatekeeperViewCreateUser({
        model : model
      });
      createUserFormView.on("authenticated", dfd.resolve);
      RootView.getInstance().setView(createUserFormView);
    },function(e) {
      console.error("error loading conversation model", e);
      setTimeout(function() { that.participationView(sid); }, 5000); // retry
    });
    return dfd.promise();
  },
  doCreateUser: function(zinvite){
    var dfd = $.Deferred();

    var createUserFormView = new CreateUserFormView({
      model : new Backbone.Model({
        zinvite: zinvite,
        create: true
      })
    });
    createUserFormView.on("authenticated", dfd.resolve);
    RootView.getInstance().setView(createUserFormView);
    return dfd.promise();
  },
  createUser: function(){
    var that = this;
    this.doLogin(true).done(function() {
    // this.doCreateUser().done(function() {
      that.navigate("inbox", {trigger: true});
      // that.inbox();
    });
  },
  pwReset: function(pwresettoken) {
    var view = new PasswordResetView({
      pwresettoken: pwresettoken
    });
    RootView.getInstance().setView(view);
  },
  pwResetInit: function() {
    var view = new PasswordResetInitView();
    RootView.getInstance().setView(view );
  },
  doLogin: function(create) {
    var dfd = $.Deferred();
    var gatekeeperView = new ConversationGatekeeperViewCreateUser({
      model: new Backbone.Model({
        create: create
      })
    });
    gatekeeperView.on("authenticated", dfd.resolve);
    RootView.getInstance().setView(gatekeeperView);
    return dfd.promise();
  },
  login: function(sid){
    var that = this;
    this.doLogin(false).done(function() {
      if (sid) {
        // Redirect to a specific conversation after the user signs in.
        // TODO think - do we want to use this route for this scenario, it's probably handled by the other gatekeeper functions.
        that.participationView(sid);
      } else {
        that.navigate("inbox", {trigger: true});
      }
    });
  },
  faq: function(){
    var faqCollection = new FaqCollection(FaqContent)
    var faqView = new FaqView({collection: faqCollection});
    RootView.getInstance().setView(faqView);
  }
});

 module.exports = polisRouter;