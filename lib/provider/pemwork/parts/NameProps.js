'use strict';

var nameEntryFactory = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/implementation/Name'),
    entryFactory = require('../factory/EntryFactory'),
    cmdHelper = require('bpmn-js-properties-panel/lib//helper/CmdHelper'),
    is = require('bpmn-js/lib/util/ModelUtil').is,
    isUndefined = require('lodash/lang').isUndefined;

module.exports = function(group, element, elementRegistry, translate) {

  if (!is(element, 'bpmn:Collaboration')) {
    // name
    group.entries = group.entries.concat(nameEntryFactory(element));
  } else {
    if (!isUndefined(element.businessObject.di.$parent)) {
      // display the diagram name
      var entry = entryFactory.textField({
        id: 'diagram-name',
        description: '',
        label: translate('Process Name'),
        modelProperty: 'diagram-name'
      });

      entry.get = function () {
        return {
          'diagram-name': element.businessObject.di.$parent.name
        };
      };

      entry.set = function (element, values) {
        var newProperties = {
          name: values['diagram-name']
        };
        return cmdHelper.updateBusinessObject(element.businessObject.di.$parent,
            element.businessObject.di.$parent, newProperties);
      };

      entry.validate = function(element, values, node){
        return (values['diagram-name'] === '')?{'diagram-name': 'This field cannot be empty'}:{};
      };

      group.entries.push(entry);
    }
  }

};