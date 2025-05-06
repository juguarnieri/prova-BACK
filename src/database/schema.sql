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
('Ana Costa', 'Empresa D', 'ana.costa@empresa.com', 'Marketing Digital, SEO', 'ana.jpg'),
('Lucas Pereira', 'Empresa E', 'lucas.pereira@empresa.com', 'React, Node.js', 'lucas.jpg'),
('Fernanda Lima', 'Empresa F', 'fernanda.lima@empresa.com', 'UI/UX Design, Figma', 'fernanda.jpg'),
('Rafael Almeida', 'Empresa G', 'rafael.almeida@empresa.com', 'DevOps, Docker, Kubernetes', 'rafael.jpg'),
('Juliana Souza', 'Empresa H', 'juliana.souza@empresa.com', 'Data Science, Machine Learning', 'juliana.jpg'),
('Gabriel Martins', 'Empresa I', 'gabriel.martins@empresa.com', 'C#, .NET, Azure', 'gabriel.jpg');

INSERT INTO events (name_event, date, location, description, participant_id) VALUES
('Hackathon de Inovação', '2025-09-15', 'Florianópolis', 'Maratona de programação para soluções inovadoras.', 1),
('Encontro de Marketing Digital', '2025-10-10', 'Porto Alegre', 'Discussão sobre tendências em marketing digital.', 4),
('Encontro de Marketing Digital Internacional', '2025-10-12', 'Porto Alegre', 'Discussão sobre tendências em marketing digital.', 4),
('Congresso de Inteligência Artificial', '2025-11-05', 'Brasília', 'Exploração de IA e aprendizado de máquina.', 3),
('Feira de Startups', '2025-12-01', 'Recife', 'Apresentação de startups e networking.', 2),
('Workshop de Desenvolvimento Web', '2026-01-20', 'Salvador', 'Práticas modernas de desenvolvimento web.', 5),
('Seminário de Segurança da Informação', '2026-02-15', 'Fortaleza', 'Discussão sobre cibersegurança e proteção de dados.', 6),
('Palestra sobre DevOps', '2026-03-10', 'Manaus', 'Integração de desenvolvimento e operações.', 7),
('Conferência de Design de Produto', '2026-04-05', 'Belém', 'Estratégias de design centrado no usuário.', 8);