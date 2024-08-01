window.addEventListener('load', initialize);

function initialize() {
    localStorage.clear(); // This will clear all stored data on page load
    document.getElementById('formSubmit').addEventListener('submit', onsubmitdo);
    FetchAllValuesDisplayTable();
}

function onsubmitdo(e) {
    e.preventDefault();
    var site = document.getElementById('site').value;
    var accountID = document.getElementById('accountID').value;
    var password = document.getElementById('password').value;
    var allvaluesinarray = [];
    // create object
    keeper = {
        keepsite: site,
        keepaccountID: accountID,
        keeppassword: password
    }
    if (localStorage.getItem('hold') === null) {
        // object pushed to array
        allvaluesinarray.push(keeper);
        // send the array to localStorage as object
        localStorage.setItem('hold', JSON.stringify(allvaluesinarray));
    } else {
        // if its not null, the fetch all localstorage values and then insert again
        allstoredvaluesinArrayForm = JSON.parse(localStorage.getItem('hold'));
        allstoredvaluesinArrayForm.push(keeper);
        localStorage.setItem('hold', JSON.stringify(allstoredvaluesinArrayForm));
    }

    document.getElementById('site').value = '';
    document.getElementById('accountID').value = '';
    document.getElementById('password').value = '';
    FetchAllValuesDisplayTable();
}

function FetchAllValuesDisplayTable() {
    var arrayFormated = [];
    var output = '';
    arrayFormated = JSON.parse(localStorage.getItem('hold'));
    for (var i = 0; i < arrayFormated.length; i++) {
        output += `
            <tr class='bg-default'>
                <td>${arrayFormated[i].keepsite}</td>
                <td>${arrayFormated[i].keepaccountID}</td>
                <td>
                    <span class="password">${'*'.repeat(arrayFormated[i].keeppassword.length)}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="eye-icon h-5 w-5 inline cursor-pointer" viewBox="0 0 20 20" fill="currentColor" onclick="togglePasswordVisibility(this, '${arrayFormated[i].keeppassword}')">
                        <path d="M10 2C5.58 2 1.84 4.94 0 10c1.84 5.06 5.58 8 10 8s8.16-2.94 10-8c-1.84-5.06-5.58-8-10-8zM10 14a4 4 0 110-8 4 4 0 010 8zM10 6a4 4 0 100 8 4 4 0 000-8z" class="eye-open" style="display:none"/>
                        <path d="M4.5 10a5.5 5.5 0 0110.962.94.5.5 0 00.936.342A6.5 6.5 0 103.7 8.71a.5.5 0 00.937-.341A5.49 5.49 0 014.5 10z" class="eye-closed"/>
                    </svg>
                </td>
                <td>
                    <button class="edit-btn px-4 py-2 bg-yellow-400 text-white rounded" onclick="editEntry(${i})">Edit</button>
                    <button class="delete-btn px-4 py-2 bg-red-500 text-white rounded" onclick="deleteEntry(${i})">Delete</button>
                </td>
            </tr>
        `;
    }
    document.getElementById('dynamicFill').innerHTML = output;
}

function togglePasswordVisibility(icon, password) {
    const passwordSpan = icon.previousElementSibling;
    const eyeOpen = icon.querySelector('.eye-open');
    const eyeClosed = icon.querySelector('.eye-closed');
    
    if (passwordSpan.textContent === '*'.repeat(password.length)) {
        passwordSpan.textContent = password;
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    } else {
        passwordSpan.textContent = '*'.repeat(password.length);
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    }
}

function togglePasswordInputVisibility() {
    const passwordInput = document.getElementById('password');
    const icon = document.querySelector('.eye-icon');
    const eyeOpen = icon.querySelector('.eye-open');
    const eyeClosed = icon.querySelector('.eye-closed');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    } else {
        passwordInput.type = 'password';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    }
}

function editEntry(index) {
    var arrayFormated = JSON.parse(localStorage.getItem('hold'));
    var entry = arrayFormated[index];

    document.getElementById('site').value = entry.keepsite;
    document.getElementById('accountID').value = entry.keepaccountID;
    document.getElementById('password').value = entry.keeppassword;

    arrayFormated.splice(index, 1);
    localStorage.setItem('hold', JSON.stringify(arrayFormated));
    FetchAllValuesDisplayTable();
}

function deleteEntry(index) {
    var arrayFormated = JSON.parse(localStorage.getItem('hold'));
    arrayFormated.splice(index, 1);
    localStorage.setItem('hold', JSON.stringify(arrayFormated));
    FetchAllValuesDisplayTable();
}
