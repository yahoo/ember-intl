import { get, defineProperty } from '@ember/object';
import ComputedProperty from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';

export default class IntlComputedProperty extends ComputedProperty {
  constructor(fn, ...dependentKeys) {
    super(function(propertyKey) {
      let intl = get(this, 'intl');

      assert(`ember-intl: Could not look up 'intl' service for the property '${propertyKey}' on '${this}'.`, intl);

      return fn.call(this, intl, propertyKey, this);
    });

    this.property('intl.locale', ...dependentKeys);
    this.readOnly();
  }

  setup(proto) {
    if (super.setup) {
      super.setup(...arguments);
    }

    if (!proto.intl) {
      // Implicitly inject the `intl` service, if it is not already injected.
      // This allows the computed property to depend on `intl.locale`.
      defineProperty(proto, 'intl', service('intl'));
    }
  }
}
