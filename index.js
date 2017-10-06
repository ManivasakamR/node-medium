// Generated by CoffeeScript 1.9.3
(function() {
  var https;

  https = require('https');

  exports.rest = function(host, endpoint, method, callback) {
    var headers, options, req;
    headers = {
      'Accept': 'application/json'
    };
    options = {
      'host': host,
      'path': endpoint,
      'method': method,
      'headers': headers
    };
    req = https.request(options, function(res) {
      var responseString;
      res.setEncoding('utf-8');
      responseString = '';
      res.on('data', function(data) {
        return responseString += data;
      });
      return res.on('end', function() {
        var responseObject;
        responseObject = JSON.parse(responseString.replace('])}while(1);</x>', ''));
        return callback(responseObject);
      });
    });
    return req.end();
  };

  exports.getPost = function(collection, id, callback) {
    return exports.rest('medium.com', '/' + collection + '/' + id, 'GET', function(data) {
      var author, i, j, k, l, len, len1, links, p, paragraphs, ref, ref1, v;
      if (data.success) {
        paragraphs = [];
        ref = data.payload.value.content.bodyModel.paragraphs;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          links = [];
          ref1 = p.markups;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            l = ref1[j];
            if (l.type === 3) {
              links.push({
                'start': l.start,
                'end': l.end,
                'href': l.href
              });
            }
          }
          paragraphs.push({
            'text': p.text,
            'type': p.type,
            'links': links
          });
        }
        author = ((function() {
          var ref2, results;
          ref2 = data.payload.references.User;
          results = [];
          for (k in ref2) {
            v = ref2[k];
            results.push(v);
          }
          return results;
        })())[0];
        collection = ((function() {
          var ref2, results;
          ref2 = data.payload.references.Collection;
          results = [];
          for (k in ref2) {
            v = ref2[k];
            results.push(v);
          }
          return results;
        })())[0];
        return callback({
          'success': true,
          'title': data.payload.value.title,
          'createdAt': data.payload.value.createdAt,
          'subTitle': data.payload.value.content.subtitle,
          'author': author,
          'collection': collection,
          'paragraphs': paragraphs,
          'inResponseToPostId': data.payload.value.inResponseToPostId
        });
      } else {
        return callback({
          'success': false
        });
      }
    });
  };

  exports.getCollection = function(collection, callback) {
    return exports.rest('medium.com', '/' + collection, 'GET', function(data) {
      var author, i, k, len, p, posts, ref, v;
      if (data.success) {
        posts = [];
        ref = data.payload.references.Post;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          posts.push({
            'id': p.id,
            'title': p.title,
            'createdAt': p.createdAt
          });
        }
        author = ((function() {
          var ref1, results;
          ref1 = data.payload.references.User;
          results = [];
          for (k in ref1) {
            v = ref1[k];
            results.push(v);
          }
          return results;
        })())[0];
        return callback({
          'success': true,
          'name': data.payload.value.name,
          'author': author,
          'createdAt': data.payload.value.createdAt,
          'description': data.payload.value.description,
          'shortDescription': data.payload.value.shortDescription,
          'posts': posts
        });
      } else {
        return callback({
          'success': false
        });
      }
    });
  };

  exports.getUser = function(username, callback) {
    return exports.rest('medium.com', '/@' + username, 'GET', function(data) {
      var c, collections, i, j, len, len1, p, posts, ref, ref1;
      if (data.success) {
        posts = [];
        ref = data.payload.latestPosts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          posts.push({
            'id': p.id,
            'title': p.title,
            'createdAt': p.createdAt
          });
        }
        collections = [];
        ref1 = data.payload.collections;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          c = ref1[j];
          collections.push({
            'id': c.id,
            'title': c.title,
            'tags': c.tags,
            'createdAt': c.createdAt,
            'description': c.description,
            'shortDescription': c.shortDescription
          });
        }
        return callback({
          'success': true,
          'userId': data.payload.value.userId,
          'name': data.payload.value.name,
          'createdAt': data.payload.value.createdAt,
          'bio': data.payload.value.bio,
          'posts': posts,
          'collections': collections
        });
      } else {
        return callback({
          'success': false
        });
      }
    });
  };

}).call(this);
