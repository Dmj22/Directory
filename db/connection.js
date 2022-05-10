const pathway = require("./connection");

class DB {
  //  a reference to the connection on the class in case we need it later
  constructor(pathway) {
    this.pathway = pathway;
  }

  
  locateAllEmployees() {
    return this.pathway.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  
  locateAllPossibleManagers(employeeId) {
    return this.pathway.promise().query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }

  // Create a new employee
  createEmployee(employee) {
    return this.pathway.promise().query("INSERT INTO employee SET ?", employee);
  }

  // Remove an employee 
  removeEmployee(employeeId) {
    return this.pathway.promise().query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }

  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.pathway.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }

  // Update  employee's manager
  updateEmployeeManager(employeeId, managerId) {
    return this.pathway.promise().query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }

  // Find all roles
  locateAllRoles() {
    return this.pathway.promise().query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }

  // Create a new role
  createRole(role) {
    return this.pathway.promise().query("INSERT INTO role SET ?", role);
  }

  // Remove a role 
  removeRole(roleId) {
    return this.pathway.promise().query("DELETE FROM role WHERE id = ?", roleId);
  }

  // Find all departments
  locateAllDepartments() {
    return this.pathway.promise().query(
      "SELECT department.id, department.name FROM department;"
    );
  }

  // Find all departments, join with employees and roles
  viewDepartmentBudgets() {
    return this.pathway.promise().query(
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    );
  }

  // Create a new department
  createDepartment(department) {
    return this.pathway.promise().query("INSERT INTO department SET ?", department);
  }

  // Remove a department
  removeDepartment(departmentId) {
    return this.pathway.promise().query(
      "DELETE FROM department WHERE id = ?",
      departmentId
    );
  }

  // Find all employees in a given department, 
  locateAllEmployeesByDepartment(departmentId) {
    return this.pathway.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
      departmentId
    );
  }

  // Find all employees by manager, 
  locateAllEmployeesByManager(managerId) {
    return this.pathway.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
      managerId
    );
  }
}

module.exports = new DB(pathway);