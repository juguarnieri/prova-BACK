CREATE DATABASE testedb;
\c testedb;

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(500) NOT NULL UNIQUE,
    description TEXT,
    date DATE NOT NULL,
    location VARCHAR(250) NOT NULL
);

CREATE TABLE participants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    enterprise VARCHAR(150) NOT NULL,
    photo VARCHAR(255),
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE
);

INSERT INTO events (name, description, date, location)
VALUES 
('Tech Conference 2025', 'A maior conferência de tecnologia do ano.', '2025-06-15', 'São Paulo, Brasil'),
('Workshop de IA', 'Aprenda sobre inteligência artificial em um dia.', '2025-07-20', 'Rio de Janeiro, Brasil'),
('Hackathon Global', 'Competição de programação com prêmios incríveis.', '2025-08-10', 'Belo Horizonte, Brasil');

INSERT INTO participants (name, email, enterprise, photo, event_id)
VALUES 
('Ana Silva', 'ana.silva@example.com', 'TechCorp', 'ana_silva.jpg', 1),
('Carlos Souza', 'carlos.souza@example.com', 'InovaTech', 'carlos_souza.jpg', 1),
('Beatriz Lima', 'beatriz.lima@example.com', 'AI Solutions', 'beatriz_lima.jpg', 2),
('João Pereira', 'joao.pereira@example.com', 'CodeMasters', 'joao_pereira.jpg', 3),
('Mariana Costa', 'mariana.costa@example.com', 'DevExperts', 'mariana_costa.jpg', 3);