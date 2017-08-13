### Purepoint

[Sails](http://sailsjs.org) application, which can be installed with:

```
npm install
```

To run the application please use:
 
```
sails lift --models.migrate='alter'
```

#### Some notes and feedback

I've used an old fashion MVC style on server side and `jQuery` based approach on the client side, because of requirements. I don't see any positive point about that, except the case where you need to generate your markup on the server. The negative points are following:
  
 - Low readability, testability and maintainability of the code because of JQuery-based spaghetti approach. It will be more beneficial to use an SPA with RESTful/GraphQL based background.
   
 - Backend and front parts can be done in more reactive way with RxJS or equivalent.
 
 - The usage of Bootstrap v4 is very bizarre requirement, given that this library is still an alpha.
 
 - The refresh of the list on `keypress` is not bright in term of UX.
