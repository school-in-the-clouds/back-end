exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1,
         userName: 'js1985',
         password: "password",
         name:"John Smith",
         role:"admin",
         email:"js@usersmail.com",
         country: "Canada",
         phone:"555-589-9000"
      },
        {id: 2,
        userName: 'msanchez1',
        password: "password",
        name:"Melissa Sanchez",
        role:"student",
        email:"info@sinc.com",
        country: "United States",
        phone:"555455303"
      },
        {id: 3,
        userName: 'jwild12',
        password: "password",
        name:"Joan Wild",
        role:"volunteer",
        email:"sam@lucktours.net",
        country: "Canada",
        phone:"6748946522"
      },
        {id: 4,
        userName: 'goinplaces10',
        password: "password",
        name:"Bart Beery",
        role:"admin",
        email:"help@htt.com",
        country: "Nigeria",
        phone:"4353651398"
      },
        {id: 5,
        userName: 'djohnson1993',
        password: "password",
        name:"Dwayne Johnson",
        role:"volunteer",
        email:"djohnson1993@fakemail.com",
        country: "Mexico",
        phone:"2355056789"
      },
        {id: 6,
        userName: 'courtney2018',
        password: "password",
        name:"Courtney Holt",
        role:"volunteer",
        email:"cholt@fakemail.com",
        country: "Canada",
        phone:"6534567980"
      },
        {id: 7,
        userName: 'mpowell65',
        password: "password",
        name:"Mark Powell",
        role:"student",
        email:"mpowell65@zmail.com",
        country: "EU",
        phone:"6734553211"
      },
        {id: 8,
        userName: 'ilovedogs1995',
        password: "passwordpassword",
        name:"Joan Gannon",
        role:"student",
        email:"ilovedogs1995@usermail.com",
        country: "United States",
        phone:"3214567341"
      },
        {id: 9,
        userName: 'rmgreg00',
        password: "passwordpassword",
        name:"Robert McGregor",
        role:"student",
        email:"robert@fakemail.com",
        country: "United States",
        phone:"8807816528"
      },
        {id: 10,
        userName: 'luckyduck99',
        password: "passwordpassword",
        name:"Elias Jensen",
        role:"student",
        email:"ejensen@fakemail.com",
        country: "Canada",
        phone:"4325679999"
      },
   
      ]);
    });
};
