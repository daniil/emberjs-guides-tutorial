App = Ember.Application.create();

App.Store = DS.Store.extend({
	revision: 12,
	adapter: 'DS.FixtureAdapter'
});

App.Router.map(function() {
	this.resource('posts', function() {
		this.resource('post', { path: ':post_id' });
	});
	this.resource('about');
});

App.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('posts');
	}
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		return App.Post.find();
	}
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,

	doneEditing: function() {
		this.set('isEditing', false);
		this.get('store').commit();
	},

	edit: function() {
		this.set('isEditing', true);
	}
});

App.Post = DS.Model.extend({
	title: DS.attr('string'),
	author: DS.attr('string'),
	intro: DS.attr('string'),
	extended: DS.attr('string'),
	publishedAt: DS.attr('date')
});

App.Post.FIXTURES = [{
	id: 1,
	title: "Test 1",
	author: "Test Author 1",
	intro: "Suspendisse in elit ut massa eleifend hendrerit. Sed tristique semper vehicula. Vestibulum vel nisi at dolor euismod ultrices nec ac felis. Phasellus eleifend aliquet euismod. Integer lobortis, tellus id fringilla ultricies, nunc tortor pulvinar neque, ac facilisis urna erat at diam.",
	extended: "Proin interdum ornare ligula, sit amet imperdiet nibh cursus non. Donec tempus tellus quis nulla hendrerit imperdiet. Nunc metus nisi, pharetra et cursus eu, lacinia vel sapien. Morbi in tellus neque. Nulla sollicitudin turpis nec justo consequat porta bibendum diam auctor. Nulla cursus dapibus purus, eu vestibulum lacus ullamcorper eu. Maecenas at ipsum nec tellus sagittis rhoncus ac sit amet est. Suspendisse porttitor interdum magna id posuere.",
	publishedAt: new Date('04-01-2013')
}, {
	id: 2,
	title: "Test 2",
	author: "Test Author 2",
	intro: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque at lacus velit, et mollis ante.",
	extended: "Curabitur id libero nisl, vitae rutrum mauris. Suspendisse sed luctus ante. Aenean commodo dictum mauris, quis tincidunt ligula porttitor id. Sed elementum quam non nulla eleifend placerat. Sed pulvinar, dui sed imperdiet pulvinar, felis ipsum ultrices arcu, quis tristique mauris ipsum nec nibh. Sed et velit nibh. Nulla id purus ipsum, at facilisis neque. Nulla varius gravida justo sed varius.",
	publishedAt: new Date('04-02-2013')
}];

Ember.Handlebars.registerBoundHelper('date', function(date) {
	return moment(date).fromNow();
});

var showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(input){
	return new Ember.Handlebars.SafeString(showdown.makeHtml(input));
});