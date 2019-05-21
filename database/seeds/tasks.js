exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1,
         title: 'Meet with new students',
         description: "Need to get together and meet all incoming and new students to understand their unique needs for the program",
         user_id: 3
       },
        {id: 2,
          title: 'Onboard new students',
          description: "Complete onboarding of all new students",
          user_id: 5

       },
        {id: 3,
          title: 'Schedule End of Month Meetings',
          description: "Schedule all end of month meeting with students and admins",
          user_id: 6


       },
        {id: 4,
          title: 'Phone Call',
          description: "Call Joan and go over next weeks schedule so that she has a better understanding of what needs to be completed",
          user_id: 6


       },
        {id: 5,
          title: 'Redo Curriculum',
          description: "Update all changes to the curriculum before the start of next week.  Have any and all changes signed off for approval before moving forward",
          user_id: 1


       },
      
      ]);
    });
};
