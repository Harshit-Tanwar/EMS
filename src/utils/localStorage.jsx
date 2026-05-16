
const today = new Date().toISOString().split('T')[0]

const employees = [
    {
        "id": 1,
        "firstName": "Arjun",
        "lastName": "Sharma",
        "email": "e@e.com",
        "password": "123",
        "role": "Frontend Developer",
        "department": "Engineering",
        "phone": "+91 98765 43210",
        "joinDate": "2022-03-15",
        "salary": 75000,
        "taskCounts": { "active": 2, "newTask": 1, "completed": 1, "failed": 0 },
        "tasks": [
            { "active": true, "newTask": true, "completed": false, "failed": false, "taskTitle": "Update website", "taskDescription": "Revamp the homepage design", "taskDate": "2024-10-12", "category": "Design" },
            { "active": false, "newTask": false, "completed": true, "failed": false, "taskTitle": "Client meeting", "taskDescription": "Discuss project requirements", "taskDate": "2024-10-10", "category": "Meeting" },
            { "active": true, "newTask": false, "completed": false, "failed": false, "taskTitle": "Fix bugs", "taskDescription": "Resolve bugs reported in issue tracker", "taskDate": "2024-10-14", "category": "Development" }
        ],
        "attendance": [
            { "date": "2024-10-14", "clockIn": "09:02", "clockOut": "18:05", "status": "present" },
            { "date": "2024-10-13", "clockIn": "09:15", "clockOut": "17:50", "status": "present" },
            { "date": "2024-10-12", "clockIn": null, "clockOut": null, "status": "absent" },
            { "date": "2024-10-11", "clockIn": "08:55", "clockOut": "18:10", "status": "present" },
            { "date": "2024-10-10", "clockIn": "09:30", "clockOut": "17:45", "status": "late" }
        ],
        "todayAttendance": null,
        "leaves": [
            { "id": "l1", "type": "Sick Leave", "from": "2024-10-05", "to": "2024-10-06", "reason": "Fever and cold", "status": "approved", "appliedOn": "2024-10-04" },
            { "id": "l2", "type": "Casual Leave", "from": "2024-11-01", "to": "2024-11-02", "reason": "Personal work", "status": "pending", "appliedOn": "2024-10-15" }
        ],
        "leaveBalance": { "sick": 8, "casual": 10, "earned": 15 }
    },
    {
        "id": 2,
        "firstName": "Sneha",
        "lastName": "Patel",
        "email": "employee2@example.com",
        "password": "123",
        "role": "Backend Developer",
        "department": "Engineering",
        "phone": "+91 87654 32109",
        "joinDate": "2021-07-01",
        "salary": 82000,
        "taskCounts": { "active": 1, "newTask": 0, "completed": 1, "failed": 0 },
        "tasks": [
            { "active": true, "newTask": false, "completed": false, "failed": false, "taskTitle": "Database optimization", "taskDescription": "Optimize queries for better performance", "taskDate": "2024-10-11", "category": "Database" },
            { "active": false, "newTask": false, "completed": true, "failed": false, "taskTitle": "Design new feature", "taskDescription": "Create mockups for the new feature", "taskDate": "2024-10-09", "category": "Design" }
        ],
        "attendance": [
            { "date": "2024-10-14", "clockIn": "08:50", "clockOut": "18:00", "status": "present" },
            { "date": "2024-10-13", "clockIn": "09:00", "clockOut": "18:00", "status": "present" },
            { "date": "2024-10-12", "clockIn": "09:10", "clockOut": "17:55", "status": "present" },
            { "date": "2024-10-11", "clockIn": null, "clockOut": null, "status": "absent" },
            { "date": "2024-10-10", "clockIn": "09:45", "clockOut": "18:00", "status": "late" }
        ],
        "todayAttendance": null,
        "leaves": [
            { "id": "l3", "type": "Earned Leave", "from": "2024-10-20", "to": "2024-10-22", "reason": "Family vacation", "status": "pending", "appliedOn": "2024-10-13" }
        ],
        "leaveBalance": { "sick": 10, "casual": 9, "earned": 12 }
    },
    {
        "id": 3,
        "firstName": "Ravi",
        "lastName": "Kumar",
        "email": "employee3@example.com",
        "password": "123",
        "role": "UI/UX Designer",
        "department": "Design",
        "phone": "+91 76543 21098",
        "joinDate": "2023-01-10",
        "salary": 68000,
        "taskCounts": { "active": 2, "newTask": 1, "completed": 1, "failed": 0 },
        "tasks": [
            { "active": true, "newTask": true, "completed": false, "failed": false, "taskTitle": "Prepare presentation", "taskDescription": "Prepare slides for upcoming client presentation", "taskDate": "2024-10-13", "category": "Presentation" },
            { "active": true, "newTask": false, "completed": false, "failed": false, "taskTitle": "Code review", "taskDescription": "Review the codebase for optimization", "taskDate": "2024-10-12", "category": "Development" },
            { "active": false, "newTask": false, "completed": true, "failed": false, "taskTitle": "Testing", "taskDescription": "Test the latest build for bugs", "taskDate": "2024-10-08", "category": "QA" }
        ],
        "attendance": [
            { "date": "2024-10-14", "clockIn": "09:00", "clockOut": "18:00", "status": "present" },
            { "date": "2024-10-13", "clockIn": "09:20", "clockOut": "17:40", "status": "late" },
            { "date": "2024-10-12", "clockIn": "09:05", "clockOut": "18:05", "status": "present" },
            { "date": "2024-10-11", "clockIn": "08:58", "clockOut": "18:00", "status": "present" },
            { "date": "2024-10-10", "clockIn": null, "clockOut": null, "status": "absent" }
        ],
        "todayAttendance": null,
        "leaves": [],
        "leaveBalance": { "sick": 10, "casual": 10, "earned": 15 }
    },
    {
        "id": 4,
        "firstName": "Priya",
        "lastName": "Singh",
        "email": "employee4@example.com",
        "password": "123",
        "role": "DevOps Engineer",
        "department": "Infrastructure",
        "phone": "+91 65432 10987",
        "joinDate": "2022-09-20",
        "salary": 90000,
        "taskCounts": { "active": 2, "newTask": 1, "completed": 0, "failed": 0 },
        "tasks": [
            { "active": true, "newTask": true, "completed": false, "failed": false, "taskTitle": "Write documentation", "taskDescription": "Update the project documentation", "taskDate": "2024-10-13", "category": "Documentation" },
            { "active": true, "newTask": false, "completed": false, "failed": false, "taskTitle": "Set up CI/CD", "taskDescription": "Implement continuous integration pipeline", "taskDate": "2024-10-11", "category": "DevOps" }
        ],
        "attendance": [
            { "date": "2024-10-14", "clockIn": "08:45", "clockOut": "17:50", "status": "present" },
            { "date": "2024-10-13", "clockIn": "09:00", "clockOut": "18:00", "status": "present" },
            { "date": "2024-10-12", "clockIn": null, "clockOut": null, "status": "absent" },
            { "date": "2024-10-11", "clockIn": "09:00", "clockOut": "18:00", "status": "present" },
            { "date": "2024-10-10", "clockIn": "09:00", "clockOut": "18:00", "status": "present" }
        ],
        "todayAttendance": null,
        "leaves": [
            { "id": "l4", "type": "Sick Leave", "from": "2024-10-12", "to": "2024-10-12", "reason": "Not feeling well", "status": "approved", "appliedOn": "2024-10-12" }
        ],
        "leaveBalance": { "sick": 9, "casual": 10, "earned": 15 }
    },
    {
        "id": 5,
        "firstName": "Karan",
        "lastName": "Mehta",
        "email": "employee5@example.com",
        "password": "123",
        "role": "QA Engineer",
        "department": "Quality",
        "phone": "+91 54321 09876",
        "joinDate": "2023-05-05",
        "salary": 65000,
        "taskCounts": { "active": 2, "newTask": 1, "completed": 1, "failed": 0 },
        "tasks": [
            { "active": true, "newTask": true, "completed": false, "failed": false, "taskTitle": "UI redesign", "taskDescription": "Redesign the user interface for better UX", "taskDate": "2024-10-14", "category": "Design" },
            { "active": false, "newTask": false, "completed": true, "failed": false, "taskTitle": "Deploy new build", "taskDescription": "Deploy the latest build to production", "taskDate": "2024-10-09", "category": "DevOps" },
            { "active": true, "newTask": false, "completed": false, "failed": false, "taskTitle": "Client feedback", "taskDescription": "Gather feedback from clients after product launch", "taskDate": "2024-10-12", "category": "Support" }
        ],
        "attendance": [
            { "date": "2024-10-14", "clockIn": "09:10", "clockOut": "18:10", "status": "present" },
            { "date": "2024-10-13", "clockIn": "09:00", "clockOut": "18:00", "status": "present" },
            { "date": "2024-10-12", "clockIn": "09:00", "clockOut": "18:00", "status": "present" },
            { "date": "2024-10-11", "clockIn": "09:35", "clockOut": "18:00", "status": "late" },
            { "date": "2024-10-10", "clockIn": null, "clockOut": null, "status": "absent" }
        ],
        "todayAttendance": null,
        "leaves": [
            { "id": "l5", "type": "Casual Leave", "from": "2024-10-18", "to": "2024-10-18", "reason": "Personal errand", "status": "rejected", "appliedOn": "2024-10-14" }
        ],
        "leaveBalance": { "sick": 10, "casual": 9, "earned": 15 }
    }
]

const admin = [{ "id": 1, "email": "admin@example.com", "password": "123" }]

export const setLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(employees))
    localStorage.setItem('admin', JSON.stringify(admin))
}

export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem('employees'))
    const admin = JSON.parse(localStorage.getItem('admin'))
    return { employees, admin }
}
