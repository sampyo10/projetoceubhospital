// Função para carregar médicos disponíveis
function loadDoctors() {
    const doctors = [
        { name: 'Dr. João Silva', specialty: 'Cardiologia' },
        { name: 'Dra. Maria Oliveira', specialty: 'Pediatria' },
        { name: 'Dr. Carlos Souza', specialty: 'Dermatologia' },
    ];

    const doctorSelect = document.getElementById("doctorSelect");
    
    doctors.forEach(doctor => {
        const option = document.createElement("option");
        option.value = doctor.name;
        option.textContent = `${doctor.name} - ${doctor.specialty}`;
        doctorSelect.appendChild(option);
    });
}

// Função para carregar consultas agendadas no dashboard do paciente
function loadPatientAppointments() {
    const currentUser = sessionStorage.getItem("currentUser");
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    
    const patientAppointments = appointments.filter(appointment => appointment.patient === currentUser);
    const patientAppointmentList = document.getElementById("patientAppointmentList");

    // Limpa a lista antes de adicionar novos elementos
    patientAppointmentList.innerHTML = '';

    // Exibir quantidade de consultas agendadas
    const appointmentCount = patientAppointments.length;
    const appointmentCountMessage = appointmentCount === 0 
        ? "Não há consultas agendadas."
        : `Total de consultas agendadas: ${appointmentCount}`;
    
    const appointmentCountElement = document.createElement("p");
    appointmentCountElement.textContent = appointmentCountMessage;
    patientAppointmentList.appendChild(appointmentCountElement);

    // Exibir detalhes das consultas agendadas
    if (appointmentCount > 0) {
        patientAppointments.forEach(appointment => {
            const listItem = document.createElement("li");
            listItem.textContent = `Médico: ${appointment.doctor} - Data: ${appointment.date} - Hora: ${appointment.time}`;
            patientAppointmentList.appendChild(listItem);
        });
    }
}

// Função para carregar consultas agendadas no dashboard do médico
function loadDoctorAppointments() {
    const currentUser = sessionStorage.getItem("currentUser");
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    
    const doctorAppointments = appointments.filter(appointment => appointment.doctor === currentUser);
    const doctorAppointmentList = document.getElementById("doctorAppointmentList");

    // Limpa a lista antes de adicionar novos elementos
    doctorAppointmentList.innerHTML = '';

    if (doctorAppointments.length === 0) {
        doctorAppointmentList.innerHTML = '<li>Não há consultas agendadas.</li>';
    } else {
        doctorAppointments.forEach(appointment => {
            const listItem = document.createElement("li");
            listItem.textContent = `Paciente: ${appointment.patient} - Data: ${appointment.date} - Hora: ${appointment.time}`;
            doctorAppointmentList.appendChild(listItem);
        });
    }
}

// Função para agendar nova consulta
document.getElementById("scheduleForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const doctorName = document.getElementById("doctorSelect").value;
    const appointmentDate = document.getElementById("appointmentDate").value;
    const appointmentTime = document.getElementById("appointmentTime").value;
    const scheduleMessage = document.getElementById("scheduleMessage");

    const currentUser = sessionStorage.getItem("currentUser");
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.push({ doctor: doctorName, patient: currentUser, date: appointmentDate, time: appointmentTime });
    localStorage.setItem("appointments", JSON.stringify(appointments));

    scheduleMessage.textContent = "Consulta agendada com sucesso!";
    scheduleMessage.style.color = "green";

    // Limpar os campos do formulário após o agendamento
    document.getElementById("scheduleForm").reset();
    
    // Atualiza a lista de consultas agendadas
    loadPatientAppointments();
});

// Função para agendar nova consulta no dashboard do médico
document.getElementById("newAppointmentForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const patientName = document.getElementById("patientNameInput").value;
    const appointmentDate = document.getElementById("newAppointmentDate").value;
    const appointmentTime = document.getElementById("newAppointmentTime").value;
    
    const currentUser = sessionStorage.getItem("currentUser");
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.push({ doctor: currentUser, patient: patientName, date: appointmentDate, time: appointmentTime });
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // Limpar os campos do formulário após o agendamento
    document.getElementById("newAppointmentForm").reset();

    // Atualiza a lista de consultas agendadas
    loadDoctorAppointments();
});

// Função de logout
function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "index.html"; // Redireciona para a página de login
}

// Ao carregar a página do paciente, carregar médicos e consultas
if (document.getElementById("patientName")) {
    const currentUser = sessionStorage.getItem("currentUser");
    document.getElementById("patientName").textContent = `Bem-vindo, ${currentUser}!`;
    loadDoctors();
    loadPatientAppointments();
}

// Ao carregar a página do médico, carregar consultas
if (document.getElementById("doctorName")) {
    const currentUser = sessionStorage.getItem("currentUser");
    document.getElementById("doctorName").textContent = `Bem-vindo, Dr./Dra. ${currentUser}!`;
    loadDoctorAppointments();
}

// Função para carregar médicos disponíveis
function loadDoctors() {
    const doctors = [
        { name: 'Dr. João Silva', specialty: 'Cardiologia' },
        { name: 'Dra. Maria Oliveira', specialty: 'Pediatria' },
        { name: 'Dr. Carlos Souza', specialty: 'Dermatologia' },
    ];

    const doctorSelect = document.getElementById("doctorSelect");
    
    doctors.forEach(doctor => {
        const option = document.createElement("option");
        option.value = doctor.name;
        option.textContent = `${doctor.name} - ${doctor.specialty}`;
        doctorSelect.appendChild(option);
    });
}

// Função para carregar consultas agendadas no dashboard do paciente
function loadPatientAppointments() {
    const currentUser = sessionStorage.getItem("currentUser");
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    
    const patientAppointments = appointments.filter(appointment => appointment.patient === currentUser);
    const patientAppointmentList = document.getElementById("patientAppointmentList");

    // Limpa a lista antes de adicionar novos elementos
    patientAppointmentList.innerHTML = '';

    // Exibir quantidade de consultas agendadas
    const appointmentCount = patientAppointments.length;
    const appointmentCountMessage = appointmentCount === 0 
        ? "Não há consultas agendadas."
        : `Total de consultas agendadas: ${appointmentCount}`;
    
    const appointmentCountElement = document.createElement("p");
    appointmentCountElement.textContent = appointmentCountMessage;
    patientAppointmentList.appendChild(appointmentCountElement);

    // Exibir detalhes das consultas agendadas
    if (appointmentCount > 0) {
        patientAppointments.forEach(appointment => {
            const listItem = document.createElement("li");
            listItem.textContent = `Médico: ${appointment.doctor} - Data: ${appointment.date} - Hora: ${appointment.time}`;
            patientAppointmentList.appendChild(listItem);
        });
    }
}

// Função para carregar consultas agendadas no dashboard do médico
function loadDoctorAppointments() {
    const currentUser = sessionStorage.getItem("currentUser");
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    
    const doctorAppointments = appointments.filter(appointment => appointment.doctor === currentUser);
    const doctorAppointmentList = document.getElementById("doctorAppointmentList");

    // Limpa a lista antes de adicionar novos elementos
    doctorAppointmentList.innerHTML = '';

    if (doctorAppointments.length === 0) {
        doctorAppointmentList.innerHTML = '<li>Não há consultas agendadas.</li>';
    } else {
        doctorAppointments.forEach(appointment => {
            const listItem = document.createElement("li");
            listItem.textContent = `Paciente: ${appointment.patient} - Data: ${appointment.date} - Hora: ${appointment.time}`;
            doctorAppointmentList.appendChild(listItem);
        });
    }
}

// Função para realizar o login
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const userType = document.querySelector('input[name="userType"]:checked').value;

    // Verificação básica de credenciais (pode ser substituída por uma verificação real)
    if (username && password) {
        sessionStorage.setItem("currentUser", username);
        if (userType === "doctor") {
            window.location.href = "doctorDashboard.html"; // Redireciona para o dashboard do médico
        } else {
            window.location.href = "patientDashboard.html"; // Redireciona para o dashboard do paciente
        }
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// Função para agendar nova consulta
document.getElementById("scheduleForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const doctorName = document.getElementById("doctorSelect").value;
    const appointmentDate = document.getElementById("appointmentDate").value;
    const appointmentTime = document.getElementById("appointmentTime").value;
    const scheduleMessage = document.getElementById("scheduleMessage");

    const currentUser = sessionStorage.getItem("currentUser");
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.push({ doctor: doctorName, patient: currentUser, date: appointmentDate, time: appointmentTime });
    localStorage.setItem("appointments", JSON.stringify(appointments));

    scheduleMessage.textContent = "Consulta agendada com sucesso!";
    scheduleMessage.style.color = "green";

    // Limpar os campos do formulário após o agendamento
    document.getElementById("scheduleForm").reset();
    
    // Atualiza a lista de consultas agendadas
    loadPatientAppointments();
});

// Função para agendar nova consulta no dashboard do médico
document.getElementById("newAppointmentForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const patientName = document.getElementById("patientNameInput").value;
    const appointmentDate = document.getElementById("newAppointmentDate").value;
    const appointmentTime = document.getElementById("newAppointmentTime").value;
    
    const currentUser = sessionStorage.getItem("currentUser");
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.push({ doctor: currentUser, patient: patientName, date: appointmentDate, time: appointmentTime });
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // Limpar os campos do formulário após o agendamento
    document.getElementById("newAppointmentForm").reset();

    // Atualiza a lista de consultas agendadas
    loadDoctorAppointments();
});

// Função de logout
function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "index.html"; // Redireciona para a página de login
}

// Ao carregar a página do paciente, carregar médicos e consultas
if (document.getElementById("patientName")) {
    const currentUser = sessionStorage.getItem("currentUser");
    document.getElementById("patientName").textContent = `Bem-vindo, ${currentUser}!`;
    loadDoctors();
    loadPatientAppointments();
}

// Ao carregar a página do médico, carregar consultas
if (document.getElementById("doctorName")) {
    const currentUser = sessionStorage.getItem("currentUser");
    document.getElementById("doctorName").textContent = `Bem-vindo, Dr./Dra. ${currentUser}!`;
    loadDoctorAppointments();
}
