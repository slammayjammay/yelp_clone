yup.Views.UserFollowers = Backbone.CompositeView.extend({
  template: JST['users/followers'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.addFollows);
    this.addFollows();
  },

  addFollows: function () {
    this.model.follows().each(function (follower) {
      var view = new yup.Views.UserIndexItem({ model: follower });
      this.addSubview('.followers', view);
    }.bind(this));

    this.render();
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});
