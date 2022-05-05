USE directory;

INSERT INTO department (id, name)
     VALUES
     (1,"Engineering"),
     (2,"Sales"),
     (3,"Finances"),
     (4,"Legal");

INSERT INTO role (id, title, salary, department_id)
     VALUES
      (1,"Manager",200000,1),
      (2,"Sr Engineer",150000,1),
      (3,"Engineer",120000,1),
      (4,"Manager",200000,2),
      (5,"Sales Rep",100000,2),
      (6,"Manager",200000,3),
      (7,"Sr Accountant",150000,3),
      (8,"Accountant",120000,3),
      (9,"Attorney",250000,4),
      (10,"Paralegal",120000,4); 

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES
     (1,"James","Cline",1,1),
     (2,"Dawn","Rogers",2,1),
     (3,"Aria","Stark",3,1),
     (4,"Kodi","Sharp",4,2),
     (5,"Tim","Jones",5,2),
     (6,"Sonya","Reed",6,3),
     (7,"Victor","Waters",7,3),
     (8,"Kelly","Hood",8,3),
     (9,"Terry","James",9,4),
     (10,"Rose","Ebony",10,4),
     (11,"Tylen","Wills",1,null),
     (12,"Marquis","Cider",4,null),
     (13,"Dave","Right",6,null);