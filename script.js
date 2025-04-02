// Simulate a database using localStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Create a new user (with access set to false by default)
function createUser(username, password) {
    const users = getUsers();
    if (users.find(user => user.username === username)) {
        alert('Username already exists!');
        return;
    }
    users.push({ username, password, access: false }); // Access is false by default
    saveUsers(users);
    alert(`User ${username} created successfully! Awaiting admin approval.`);
}

// Display all users on the master login page
function displayUsers() {
    const users = getUsers();
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        if (user.username !== 'admin') { // Exclude admin from the list
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `user-login.html?username=${user.username}`;
            link.textContent = user.username;
            link.className = 'btn';
            li.appendChild(link);
            userList.appendChild(li);
        }
    });
}

// Authenticate user login
function loginUser(username, password) {
    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    return !!user;
}

// Toggle user access (admin functionality)
function toggleAccess(username) {
    const users = getUsers();
    const user = users.find(user => user.username === username);
    if (user) {
        user.access = !user.access;
        saveUsers(users);
        window.location.reload(); // Refresh to update the UI
    }
}

// Manage user content
function getUserContent(username) {
    const content = localStorage.getItem(`content_${username}`);
    return content ? JSON.parse(content) : {};
}

function saveUserContent(username, page, content) {
    const userContent = getUserContent(username);
    userContent[page] = content;
    localStorage.setItem(`content_${username}`, JSON.stringify(userContent));
}