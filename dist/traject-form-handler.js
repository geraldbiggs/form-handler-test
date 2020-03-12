"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@vue/composition-api");function t(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function r(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var n={type:Boolean,default:!1},o={type:Boolean,default:!0},i={type:Object,default:function(){}},a={type:Boolean,default:!0},u=function(e){return function(){e.value=!e.value}},l=function(n){var o=function(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?r(Object(o),!0).forEach((function(r){t(e,r,o[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({},n),i=e.reactive(n),a=function(){i=o};return{data:i,makeEditable:function(t){return function(t){return function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a;return e.watch(t,(function(e){null!==e&&(!0===e?r(i):n(i,o))}),{immediate:!0})}}},initialize:a}};exports.actionable=o,exports.editEntry=i,exports.editable=n,exports.formHandler=function(e){var t=function(){e("completed",!0)};return{cancellable:function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e("cancelled",r),t()},completeable:t,saveable:function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e("saved",r),t()}}},exports.makeFormGroup=function(r){var n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"form",i=(r.data,e.reactive(r.data));return t(n={},o+"Entity",r.entity),t(n,o+"Inputs",e.reactive(r.inputs)),t(n,o,i),n},exports.makeFormState=l,exports.makePersistable=function(e,t){return function(r){if(e)return t(r)}},exports.persistable=a,exports.setForm=function(e){return function(t,r){var n=new r(e.filterFields(t,r.entity)),o=n.inputs,i=n.data,a=l(i);return{inputs:o,state:a.data,model:r,data:i,initialize:a.initialize}}},exports.toggleForm=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],r=e.ref(t),n=u(r);return{visible:r,toggle:n}},exports.toggleVisible=u;
