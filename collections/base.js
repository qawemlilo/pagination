"use strict";

/**
 * Base Class for collections
**/

var Bookshelf = require('../dbconnect')();


Bookshelf.Collection = Bookshelf.Collection.extend({

  limit: 10,


  currentpage: 1,

  pagination: {},


  base: '',


  paginationLimit: 10,


  queries: [],


  order: 'desc',

 
  /**
   * Creates pagination data
   *
   * @returns: {Promiscollectione} - resolves with pagination
  */ 
  generatePagination: function (totalRecords) {
    var self = this;
    var totalpages = Math.ceil(totalRecords / self.limit);
    var groups = Math.ceil(totalpages / self.paginationLimit);
    var currentpage = self.currentpage; 
    var items = [];
    var lastpage = totalpages;

    var next = currentpage < lastpage ? currentpage + 1 : 1;
    var prev = currentpage < 2 ? lastpage : currentpage - 1;

    var isFirstPage = currentpage === 1;
    var isLastPage = currentpage === lastpage;

    var highestF = currentpage + 2;
    var lowestF = currentpage - 2;
    var counterLimit = totalpages - 2; 

    if (groups > 1) {
      items.push(1);
      items.push(2);
      
      // if our current page is higher than 3
      if (lowestF > 3) {
        items.push('...');

        //lets check if we our current page is towards the end
        if (lastpage - currentpage < 2) {
           lowestF -=  3; // add more previous links       
        }
      }
      else {
        lowestF = 3; // lowest num to start looping from
      }

      for (var counter = lowestF; counter < lowestF + 5; counter++) {
        if (counter > counterLimit) {
          break;
        }

        items.push(counter);
      }
        
      // if current page not towards the end
      if (highestF < totalpages - 2) {
        items.push('...');
      }

      items.push(lastpage - 1);
      items.push(lastpage);
    }
    else {
      // no complex pagination required
      for (var counter2 = 1; counter2 <= lastpage; counter2++) {
        items.push(counter2);
      }
    } 
      
    self.pagination = {
      items: items,
      currentpage: currentpage,
      base: self.base,
      isFirstPage: isFirstPage,
      isLastPage: isLastPage,
      next: next,
      prev: prev,
      total: totalRecords,
      limit: self.limit
    };

    return self.pagination;
  },

 
  /**
   * Creates pagination data
   *
   * @returns: {Promiscollectione} - resolves with pagination
  */ 
  paginate: function () {
    var self = this;
    var query = self.model.forge().query();
    var totalpages = 0;

    if (self.queries.length > 1) {
      self.queries.forEach(function (where, i) {
        if (i === 0) {
          query.where(where[0], where[1], where[2]);
        }
        else {
          query.andWhere(where[0], where[1], where[2]);
        }
      });
    }
    
    return query.count('id AS total')
    .then(function (results) {
      totalpages = parseInt(results[0].total, 10);

      self.generatePagination(totalpages);

      return totalpages;
    });
  },

  
  /**
   * fetches posts ordered by {sortColumn} and creates pagination 
   * @returns: {Promise} - resolves with an Object
  */
  fetchBy: function (sortColumn, options, fetchOptions) {
    
    options = options || {};
    fetchOptions = fetchOptions || {};

    var self = this;
    var limit = parseInt(options.limit, 10) || self.limit;
    var currentpage = parseInt(options.page, 10) || self.currentpage;
    var order = options.order || self.order; 

    self.queries = options.where || [];

    self.currentpage = currentpage;
    self.limit = limit;
    self.order = order;
    self.base = options.base || '';
    
    function fetch() {
      return self.constructor.forge()
      .query(function (query) {
        query.limit(limit);
        
        self.queries.forEach(function (where, i) {
          if (i === 0) {
            query.where(where[0], where[1], where[2]);
          }
          else {
            query.andWhere(where[0], where[1], where[2]);
          }
        });

        query.offset((currentpage - 1) * limit);
        query.orderBy(sortColumn, order);
      })
      .fetch(fetchOptions)
      .then(function (collection) {
        return {
          collection: collection,
          pagination: self.pagination
        };
      });
    }

    return self.paginate().then(fetch);
  }
});


module.exports = Bookshelf;