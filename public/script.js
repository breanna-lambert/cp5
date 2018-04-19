var app = new Vue({
  el: '#app',
  data: {
    blogPosts: [],
    text: '',
    important: false,
  },
  created: function() {
    this.getBlogPosts();
  },
  computed: {
    classObject: function (blogPost) {
      return {
        important: blogPost.important === "1",
        blogEntry: blo.important === "0"
      }
    },
    isImportant: function(blogPost){
      return (blogPost.important === "1");
    }
  },
  methods: {
    getBlogPosts: function() {
      axios.get("/api/blogPosts").then(response => {
        this.blogPosts = response.data;
        console.log(response.data);
        return true;
      }).catch(err => {
      });
    },
    addBlogPost: function() {
      axios.post("/api/blogPosts", {
        text: this.text,
        important: this.important,
      }).then(response => {
        this.text = "";
        this.important = false;
        this.getBlogPosts();
        return true;
      }).catch(err => {
      });
    },
    deleteBlogPost: function(blogPost) {
      axios.delete("/api/blogPosts/" + blogPost.id).then (response => {
        this.getBlogPosts();
      }).catch(err => {
      });
    },
    toggleImportance: function(blogPost) {
      console.log(blogPost.important);
      axios.put("/api/blogPosts/" + blogPost.id, {
        text: blogPost.text,
        important: !blogPost.important
      }).then (response => {
        this.getBlogPosts();
        return true;
      }).catch(err =>{
      });
    },
    importanceClass: function(blogPost){
      if (blogPost.important === true){
        return 'important';
      }
      else {
        return 'blogEntry';
      }
    }
  },
  directives: {
    //cursor automatically in textbox on load
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
});




/*
toggleImportance: function(blogPost) {
      axios.put("/api/blogPosts/" + blogPost.id, {
        text: blogPost.text,
        important: !blogPost.important,
      }).then(response => {
        return true;
      }).catch(err => {
      });
    }
    toggleImportance: function(blogPost) {
      axios.put("/api/blogPosts/" + blogPost.id, {
        text: blogPost.text,
        important: !blogPost.important,
      }).then(response => {
        return true;
      }).catch(err => {
      });
    }
    */