<script setup>
import { ref, watch } from "vue";
import MarkdownIt from "markdown-it";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { useData, withBase } from "vitepress";

const { theme } = useData();

if (pdfMake && pdfFonts) {
  pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;
}

const md = new MarkdownIt();
const markdownText = ref("# Selamat datang di Playground Allbibek!\n\nCoba tulis sesuatu di sini.");
const htmlOutput = ref(md.render(markdownText.value));

watch(markdownText, (newValue) => {
  htmlOutput.value = md.render(newValue);
});

const copyToClipboard = () => {
  navigator.clipboard.writeText(htmlOutput.value).then(() => {
    alert("HTML berhasil disalin!");
  });
};

const downloadPDF = () => {
  const docDefinition = {
    content: [
      {
        text: markdownText.value,
        style: 'header'
      }
    ]
  };
  pdfMake.createPdf(docDefinition).download("markdown.pdf");
};

const downloadDOCX = async () => {
  const lines = markdownText.value.split("\n").map(line => {
    if (line.startsWith("# ")) {
      return new Paragraph({
        children: [new TextRun({ text: line.replace("# ", ""), bold: true, size: 32 })],
      });
    } else if (line.startsWith("## ")) {
      return new Paragraph({
        children: [new TextRun({ text: line.replace("## ", ""), bold: true, size: 28 })],
      });
    } else if (line.startsWith("### ")) {
      return new Paragraph({
        children: [new TextRun({ text: line.replace("### ", ""), bold: true, size: 24 })],
      });
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      return new Paragraph({
        children: [new TextRun({ text: line.replace(/^- |^\* /, ""), bold: false })],
        bullet: { level: 0 },
      });
    } else {
      return new Paragraph({ children: [new TextRun(line)] });
    }
  });

  const doc = new Document({
    sections: [{ properties: {}, children: lines }],
  });

  try {
    const buffer = await Packer.toBlob(doc);
    saveAs(buffer, "markdown.docx");
  } catch (error) {
    console.error("Gagal membuat file DOCX:", error);
    alert("Gagal mengunduh DOCX.");
  }
};
</script>

<template>
<h1 class="subtitle" style="text-align: center;">This Playground is <br>a Work in Progress</h1>
  <div class="playground-container">
    <div class="editor">
      <h2 class="title">Markdown Editor</h2>
      <textarea v-model="markdownText" placeholder="Tulis Markdown di sini..."></textarea>
    </div>
    <div class="preview">
      <h2 class="title">Preview HTML</h2>
      <div v-html="htmlOutput" class="output"></div>
      <div class="button-container">
        <a class="VPButton" @click="copyToClipboard">
          {{ theme.value?.copyButtonText ?? "📄 Copy HTML" }}
        </a>
        <a class="VPButton brand" @click="downloadPDF">
          {{ theme.value?.downloadPdfButtonText ?? "PDF &darr;" }}
        </a>
        <a class="VPButton alt" @click="downloadDOCX">
          {{ theme.value?.downloadDocxButtonText ?? "DOCX &darr;" }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.vp-doc h2 {
  border-top: 0px;
  margin: 0 0 16px;
}

h2.title {
  text-align: center;
  width: 100%;
}


.editor, .preview {
  width: 100%;
}

textarea {
  width: 100%;
  height: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: monospace;
}

.output {
  border: 1px solid #ccc;
  min-height: 300px;
  padding: 10px;
  background: transparent;
  border-radius: 5px;
  overflow: auto;
  word-wrap: break-word;
  color: var(--vp-c-text-1);
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.VPButton {
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
  text-decoration: none;
}

.VPButton.brand {
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  border-radius: 36px;
}

.VPButton.alt {
  background-color: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  border-radius: 36px;
}

.VPButton.sponsor {
  background-color: var(--vp-button-sponsor-bg, #ffcc00);
  color: var(--vp-button-sponsor-text, #000);
  border-radius: 36px;
}

.VPButton:hover {
  opacity: 0.8;
}

@media (min-width: 768px) {
  .playground-container {
    flex-direction: row;
  }
  .editor, .preview {
    width: 50%;
  }
}
</style>
