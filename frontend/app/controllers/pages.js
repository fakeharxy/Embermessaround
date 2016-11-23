import Ember from 'ember';

export default Ember.Controller.extend({

  title: '',
  body: '',

  actions: {
    saveStuff() {
      var page = this.get('store').createRecord('page', {
        title: this.get('title'), 
        body: this.get('body') 
      });

      page.save();
      this.set('title', '');
      this.set('body', '');
    }
  }
});
