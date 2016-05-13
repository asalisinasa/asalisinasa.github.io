/** @fileoverview Свойства и методы элемента секции */


'use strict';



/**
* @param {HTMLElement} section
* @constructor
*/
var Section = function(section) {
  this.element  =   section;
  // this.toggle   =   $('a[href="#section"]');
  this.height   =   this.element.height();
  this.offset   =   this.element.offset();
  this.top      =   this.offset.top;
  this.left     =   this.offset.left;
  this.bottom   =   this.top + this.height;
  this.active   =   'main-nav__item-link--current';
};

// Section.prototype.highlightLink = function() {
//
// }

module.exports = Section;
