import Ember from 'ember';

export default Ember.Route.extend({
  model() {
  this.get('store').findAll('page');
  }
});
