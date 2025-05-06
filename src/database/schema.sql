CREATE DATABASE workdb;
\c workdb;

CREATE TABLE participants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    enterprise VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    skills TEXT,
    photo VARCHAR(255)
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name_event VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(150),
    description TEXT,
    participant_id INTEGER REFERENCES participants(id) ON DELETE CASCADE
);

INSERT INTO participants (name, enterprise, email, skills, photo) VALUES
('João Silva', 'Empresa A', 'joao.silva@empresa.com', 'Python, SQL', 'joao.jpg'),
('Maria Oliveira', 'Empresa B', 'maria.oliveira@empresa.com', 'Gestão de Projetos, Scrum', 'maria.jpg'),
('Carlos Santos', 'Empresa C', 'carlos.santos@empresa.com', 'Java, Spring Boot', 'carlos.jpg'),
('Ana Costa', 'Empresa D', 'ana.costa@empresa.com', 'Marketing Digital, SEO', 'ana.jpg');

INSERT INTO events (name_event, date, location, description, participant_id) VALUES
('Workshop de Tecnologia', '2025-05-15', 'São Paulo', 'Evento sobre novas tecnologias.', 1),
('Conferência de Negócios', '2025-06-20', 'Rio de Janeiro', 'Discussão sobre estratégias de negócios.', 2),
('Seminário de Inovação', '2025-07-10', 'Belo Horizonte', 'Apresentação de inovações no mercado.', 3),
('Palestra de Liderança', '2025-08-05', 'Curitiba', 'Palestra sobre liderança e gestão.', 4);