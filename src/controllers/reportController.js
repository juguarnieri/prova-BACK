const PDFDocument = require("pdfkit");
const participantModel = require("../models/participantModel");
const eventModel = require("../models/eventModel");

const addTableHeader = (doc, headers, positions, widths) => {
    const initialY = doc.y;
    doc.fontSize(12).font("Helvetica-Bold");

    headers.forEach((text, i) => {
        doc.text(text, positions[i], initialY, {
            width: widths[i],
            align: "left",
            ellipsis: true,
            lineBreak: false,
        });
    });

    doc.moveTo(50, initialY + 15).lineTo(550, initialY + 15).stroke();
    doc.y = initialY + 20;
};

const addTableRow = (doc, data, positions, widths) => {
    const rowHeight = 25;
    const initialY = doc.y;

    doc.font("Helvetica").fontSize(10);
    data.forEach((text, i) => {
        doc.text(String(text), positions[i], initialY, {
            width: widths[i],
            align: "left",
            ellipsis: true,
            lineBreak: false,
        });
    });

    doc.y = initialY + rowHeight;
};

const initializePDF = (res, title, filename) => {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);
    doc.fontSize(18).font("Helvetica-Bold").text(title, { align: "center" });
    doc.moveDown(1);
    return doc;
};

const exportParticipantsPDF = async (req, res) => {
    try {
        const participants = await participantModel.getParticipantsWithEvent();

        if (participants.length === 0) {
            return res.status(404).json({ message: "Nenhum participante encontrado." });
        }

        const doc = initializePDF(res, "Relatório de Participantes", "participants.pdf");

        const headers = ["ID", "Name", "Enterprise", "Email", "Event"];
        const positions = [50, 80, 200, 350, 450];
        const widths = [30, 90, 130, 90, 100];

        addTableHeader(doc, headers, positions, widths);

        participants.forEach((participant) => {
            const row = [
                participant.id,
                participant.name,
                participant.enterprise,
                participant.email,
                participant.event_name,
            ];
            addTableRow(doc, row, positions, widths);
        });

        doc.end();
    } catch (error) {
        console.error("Erro ao gerar o PDF de participantes:", error);
        res.status(500).json({ message: "Erro ao gerar o PDF de participantes." });
    }
};

const exportEventsPDF = async (req, res) => {
    try {
        const events = await eventModel.getEventsWithParticipantsCount();

        if (events.length === 0) {
            return res.status(404).json({ message: "Nenhum evento encontrado." });
        }

        const doc = initializePDF(res, "Relatório de Eventos", "events.pdf");

        const headers = ["ID", "Name", "Date", "Location","Descrição", "Participants"];
        const positions = [50, 80, 200, 350, 450, 500];
        const widths = [30, 90, 90, 100, 150, 50];

        addTableHeader(doc, headers, positions, widths);

        events.forEach((event) => {
            const row = [
                event.id,
                event.name_event,
                new Date(event.date).toLocaleDateString("pt-BR"), 
                event.location,
                event.description,
                event.participants_count,
            ];
            addTableRow(doc, row, positions, widths);
        });

        doc.end();
    } catch (error) {
        console.error("Erro ao gerar o PDF de eventos:", error);
        res.status(500).json({ message: "Erro ao gerar o PDF de eventos." });
    }
};

module.exports = {
    exportParticipantsPDF,
    exportEventsPDF,
};