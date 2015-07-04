yup.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    $(window).scroll(function() {
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 1) {
        this.renderNextPage();
      }
    }.bind(this));
  },

  routes: {
    "": "feed",
    "users/:id": "userShow",
    "businesses/:id": "businessShow",
    "search(/:query)(/:order)": "search"
  },

  businessShow: function (id) {
    var business = new yup.Models.Business({ id: id });
    business.fetch();
    var view = new yup.Views.BusinessShow({
      model: business,
      collection: business.reviews()
    });
    this._swapView(view);
  },

  feed: function () {
    var reviews = new yup.Collections.Reviews();
    reviews.fetch();
    var view = new yup.Views.FeedShow({ collection: reviews });
    this._swapView(view);
  },

  userShow: function (id) {
    var user = new yup.Models.User({ id: id });
    user.fetch();
    var view = new yup.Views.UserShow({
      model: user,
      collection: user.reviews()
    });

    this._swapView(view);
  },

  renderNextPage: function () {
    if (this._currentView.$el.attr('class') == 'search-show') {
      this._currentView.collection.fetch({
        remove: false,
        data: { searchKeys: this.query,
                order: this.order,
                page: this._currentView.collection.page + 1
              },
        success: function (model, response) {
          this._currentView.map.showNewResults(response.businesses);
        }.bind(this)
      });
    }
  },

  search: function (query, order) {
    this.query = query || 'restaurants';
    this.order = order || 'id';
    var businesses = new yup.Collections.Businesses();
    businesses.fetch({
      url: 'api/businesses',
      data: { searchKeys: this.query, order: this.order }
    });
    var view = new yup.Views.SearchShow({
      router: this,
      query: query,
      order: order,
      collection: businesses
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
