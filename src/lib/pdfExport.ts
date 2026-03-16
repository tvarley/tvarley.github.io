import html2pdf from 'html2pdf.js';

export interface PDFOptions {
  filename?: string;
  format?: 'a4' | 'letter' | 'a3' | 'a5';
  orientation?: 'portrait' | 'landscape';
  margin?: number | [number, number, number, number]; // top, right, bottom, left
  quality?: number;
}

export interface ExportResult {
  success: boolean;
  blob?: Blob;
  error?: string;
}

const defaultOptions: PDFOptions = {
  format: 'letter',
  orientation: 'portrait',
  margin: [15, 20, 15, 20], // Standard print margins
  quality: 0.95,
};

export function generatePDF(
  sourceElement: HTMLElement,
  options: Partial<PDFOptions> = {}
): Promise<ExportResult> {
  return new Promise((resolve) => {
    // 50ms delay to allow UI to show loading state
    setTimeout(async () => {
      try {
        const mergedOptions = { ...defaultOptions, ...options };
        
        // 1. Create the simplified print version
        const printElement = preparePrintVersion(sourceElement, mergedOptions.filename);
        
        // Fix for Blank PDF: Element MUST be in DOM.
        // Fix for "Ghost" Glitch: Hide it using a 0x0 overflow container.
        const hiddenContainer = document.createElement('div');
        hiddenContainer.style.position = 'fixed';
        hiddenContainer.style.left = '0';
        hiddenContainer.style.top = '0';
        hiddenContainer.style.width = '0';
        hiddenContainer.style.height = '0';
        hiddenContainer.style.overflow = 'hidden';
        hiddenContainer.style.zIndex = '-9999';
        
        hiddenContainer.appendChild(printElement);
        document.body.appendChild(hiddenContainer);

        // 2. Configure html2pdf
        const opt = {
          margin: mergedOptions.margin,
          filename: mergedOptions.filename || 'document.pdf',
          image: { type: 'jpeg' as const, quality: mergedOptions.quality },
          html2canvas: { 
            scale: 2, // Higher scale for better text quality
            useCORS: true, 
            letterRendering: true,
            scrollY: 0,
            windowWidth: 800 
          },
          jsPDF: { 
            unit: 'mm', 
            format: mergedOptions.format, 
            orientation: mergedOptions.orientation 
          },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // 3. Generate PDF
        const worker = html2pdf().set(opt).from(printElement);
        const blob = await worker.outputPdf('blob');

        // 4. Cleanup
        document.body.removeChild(hiddenContainer);

        resolve({ success: true, blob });
      } catch (error) {
        console.error('PDF Generation failed:', error);
        resolve({ 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error during PDF generation' 
        });
      }
    }, 50);
  });
}

/**
 * Creates a cleaned-up, simplified DOM structure optimized for printing.
 * Extracts only essential content: Header, Title, Description, Notes, Code.
 */
export function preparePrintVersion(source: HTMLElement, filename?: string): HTMLElement {
  const container = document.createElement('div');
  container.className = 'pdf-print-container';
  
  // Basic print styles to ensure high contrast and proper layout
  // 620px + border-box fits SAFELY within Letter/A4 margins (approx 665px printable)
  container.style.width = '620px'; 
  container.style.boxSizing = 'border-box';
  container.style.fontFamily = 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  container.style.color = '#24292e';
  container.style.background = '#ffffff';
  container.style.padding = '40px'; 
  container.style.lineHeight = '1.6';
  container.style.borderTop = '8px solid #4682B4'; // Steel Blue branding
  container.style.textAlign = 'left';

  // --- Answer Extraction ---
  let verifiedAnswer: string | null = null;
  const implementations = source.querySelectorAll('.implementation pre, .implementation code');
  for (const imp of implementations) {
      const text = imp.textContent || '';
      const match = text.match(/(?:\/\/|#)\s*Answer:\s*(.+)/i);
      if (match && match[1]) {
          verifiedAnswer = match[1].trim();
          break; // Stop after finding the first valid answer
      }
  }

  // --- 1. Branding Header ---
  const brandHeader = document.createElement('div');
  brandHeader.style.display = 'flex';
  brandHeader.style.justifyContent = 'space-between';
  brandHeader.style.alignItems = 'flex-start';
  brandHeader.style.borderBottom = '2px solid #eaecef';
  brandHeader.style.paddingBottom = '15px';
  brandHeader.style.marginBottom = '30px';
  brandHeader.style.textAlign = 'left';

  const brandLeft = document.createElement('div');
  
  const logoText = document.createElement('div');
  logoText.textContent = 'Euler Solutions';
  logoText.style.fontFamily = 'Georgia, serif';
  logoText.style.fontSize = '24px';
  logoText.style.fontWeight = 'bold';
  logoText.style.color = '#2c3e50';
  logoText.style.letterSpacing = '-0.5px';

  const authorText = document.createElement('div');
  authorText.textContent = 'by Tim Varley';
  authorText.style.fontFamily = 'system-ui, sans-serif';
  authorText.style.fontSize = '12px';
  authorText.style.color = '#7f8c8d';
  authorText.style.marginTop = '2px';

  const linkText = document.createElement('div');
  linkText.textContent = 'https://tvarley.github.io';
  linkText.style.fontFamily = 'system-ui, sans-serif';
  linkText.style.fontSize = '10px';
  linkText.style.color = '#4682B4';
  linkText.style.marginTop = '4px';

  brandLeft.appendChild(logoText);
  brandLeft.appendChild(authorText);
  brandLeft.appendChild(linkText);
  
  brandHeader.appendChild(brandLeft);
  
  const brandRight = document.createElement('div');
  brandRight.style.display = 'flex';
  brandRight.style.flexDirection = 'column';
  brandRight.style.alignItems = 'flex-end';
  brandRight.style.gap = '8px';

  const problemBadgeSource = source.querySelector('.text-steel-blue.font-mono');
  if (problemBadgeSource) {
      const badge = document.createElement('div');
      badge.textContent = problemBadgeSource.textContent?.trim() || '';
      badge.style.fontFamily = '"JetBrains Mono", monospace';
      badge.style.fontSize = '14px';
      badge.style.fontWeight = 'bold';
      badge.style.color = '#4682B4';
      badge.style.padding = '4px 8px';
      badge.style.backgroundColor = '#f0f7ff';
      badge.style.borderRadius = '4px';
      brandRight.appendChild(badge);
  }

  if (verifiedAnswer) {
      const answerBadge = document.createElement('div');
      answerBadge.textContent = `Verified Answer: ${verifiedAnswer}`;
      answerBadge.style.fontFamily = '"JetBrains Mono", monospace';
      answerBadge.style.fontSize = '12px';
      answerBadge.style.fontWeight = 'bold';
      answerBadge.style.color = '#065f46';
      answerBadge.style.backgroundColor = '#d1fae5';
      answerBadge.style.border = '1px solid #065f46';
      answerBadge.style.padding = '4px 8px';
      answerBadge.style.borderRadius = '4px';
      answerBadge.style.whiteSpace = 'nowrap';
      brandRight.appendChild(answerBadge);
  }

  brandHeader.appendChild(brandRight);
  container.appendChild(brandHeader);


  // --- 2. Title ---
  const titleEl = source.querySelector('h1');
  if (titleEl) {
    const title = document.createElement('h1');
    title.textContent = titleEl.textContent?.trim() || 'Project Euler Solution';
    title.style.fontSize = '28px';
    title.style.margin = '0 0 25px 0';
    title.style.color = '#111';
    title.style.lineHeight = '1.3';
    container.appendChild(title);
  }

  // --- 3. Description ---
  const descriptionSource = source.querySelector('.prose');
  if (descriptionSource) {
    const descSection = document.createElement('div');
    descSection.style.marginBottom = '30px';
    
    const sectionHeader = document.createElement('h2');
    sectionHeader.textContent = 'Problem Description';
    sectionHeader.style.fontFamily = 'system-ui, sans-serif';
    sectionHeader.style.fontSize = '16px';
    sectionHeader.style.color = '#586069';
    sectionHeader.style.borderBottom = '1px solid #eaecef';
    sectionHeader.style.paddingBottom = '5px';
    sectionHeader.style.marginBottom = '15px';
    sectionHeader.style.marginTop = '0';
    descSection.appendChild(sectionHeader);

    const descClone = descriptionSource.cloneNode(true) as HTMLElement;
    
    descClone.style.color = '#24292e';
    descClone.style.whiteSpace = 'normal'; 
    
    const allDescElements = descClone.querySelectorAll('*');
    allDescElements.forEach((el: any) => {
      el.style.color = '#24292e';
      el.style.background = 'transparent';
      el.style.boxShadow = 'none';
      el.style.textShadow = 'none';
      
      if (el.tagName === 'A') {
          el.style.color = '#0366d6';
          el.style.textDecoration = 'none';
      }
      if (el.tagName === 'CODE') {
          el.style.fontFamily = '"JetBrains Mono", monospace';
          el.style.backgroundColor = '#f6f8fa';
          el.style.padding = '0.2em 0.4em';
          el.style.borderRadius = '3px';
          el.style.fontSize = '85%';
          el.style.color = '#24292e';
      }
    });

    descSection.appendChild(descClone);
    container.appendChild(descSection);
  }

  // --- 4. Solution Notes ---
  const notesSource = source.querySelector('#solution-notes .prose') || source.querySelector('#solution-notes');
  
  if (notesSource) {
      const notesSection = document.createElement('div');
      notesSection.style.marginBottom = '30px';
      notesSection.style.breakInside = 'avoid';

      const sectionHeader = document.createElement('h2');
      sectionHeader.textContent = 'Solution Notes';
      sectionHeader.style.fontFamily = 'system-ui, sans-serif';
      sectionHeader.style.fontSize = '16px';
      sectionHeader.style.color = '#586069';
      sectionHeader.style.borderBottom = '1px solid #eaecef';
      sectionHeader.style.paddingBottom = '5px';
      sectionHeader.style.marginBottom = '15px';
      notesSection.appendChild(sectionHeader);

      const notesClone = notesSource.cloneNode(true) as HTMLElement;
      notesClone.style.color = '#24292e';
      notesClone.style.whiteSpace = 'normal';
      
      const allNotesElements = notesClone.querySelectorAll('*');
      allNotesElements.forEach((el: any) => {
          el.style.color = '#24292e';
          el.style.background = 'transparent';
          el.style.boxShadow = 'none';
          
           if (el.tagName === 'A') {
              el.style.color = '#0366d6';
              el.style.textDecoration = 'none';
          }
      });

      notesClone.removeAttribute('id');
      notesSection.appendChild(notesClone);
      container.appendChild(notesSection);
  }

  // --- 5. Implementations (Code) ---
  const codeBlocks = source.querySelectorAll('.implementation'); 
  
  if (codeBlocks.length > 0) {
    const implementationsDiv = document.createElement('div');
    
    const sectionHeader = document.createElement('h2');
    sectionHeader.textContent = 'Implementations';
    sectionHeader.style.fontFamily = 'system-ui, sans-serif';
    sectionHeader.style.fontSize = '16px';
    sectionHeader.style.color = '#586069';
    sectionHeader.style.borderBottom = '1px solid #eaecef';
    sectionHeader.style.paddingBottom = '5px';
    sectionHeader.style.marginBottom = '15px';
    sectionHeader.style.breakAfter = 'avoid';
    implementationsDiv.appendChild(sectionHeader);

    codeBlocks.forEach(block => {
      if (block.getAttribute('data-language') === 'all') return;

      const lang = block.getAttribute('data-language') || 'Code';
      const originalPre = block.querySelector('pre');

      if (originalPre) {
        const wrapper = document.createElement('div');
        wrapper.style.marginBottom = '25px';
        wrapper.style.breakInside = 'avoid';
        
        const langTitle = document.createElement('h3');
        langTitle.textContent = lang.charAt(0).toUpperCase() + lang.slice(1);
        langTitle.style.fontSize = '14px';
        langTitle.style.fontWeight = 'bold';
        langTitle.style.marginBottom = '8px';
        langTitle.style.fontFamily = '"JetBrains Mono", monospace';
        langTitle.style.color = '#444';
        
        // Use clone but FORCE styles to override potential dark theme artifacts
        const codeClone = originalPre.cloneNode(true) as HTMLElement;
        
        // Force Print Styles (Light Theme)
        codeClone.style.whiteSpace = 'pre-wrap';
        codeClone.style.overflowX = 'hidden';
        codeClone.style.borderRadius = '6px';
        codeClone.style.margin = '0';
        codeClone.style.backgroundColor = '#f6f8fa'; // Force Light BG
        codeClone.style.color = '#24292e';           // Force Dark Text
        codeClone.style.border = '1px solid #e1e4e8';
        codeClone.style.fontFamily = '"JetBrains Mono", monospace';
        codeClone.style.fontSize = '10px';
        codeClone.style.lineHeight = '1.4';
        
        // Strip colors from children to ensure contrast (avoid white-on-white)
        const codeChildren = codeClone.querySelectorAll('*');
        codeChildren.forEach((child: any) => {
            child.style.color = 'inherit'; // Reset syntax colors
            child.style.backgroundColor = 'transparent';
        });

        // NO SCALING TRANSFORM to avoid bounds issues
        codeClone.style.width = '100%'; 

        wrapper.appendChild(langTitle);
        wrapper.appendChild(codeClone);
        implementationsDiv.appendChild(wrapper);
      }
    });

    container.appendChild(implementationsDiv);
  }

  // --- 6. Footer ---
  const footer = document.createElement('div');
  footer.style.marginTop = '40px';
  footer.style.paddingTop = '15px';
  footer.style.borderTop = '1px solid #eee';
  footer.style.fontSize = '10px';
  footer.style.color = '#999';
  footer.style.textAlign = 'center';
  footer.style.fontFamily = 'system-ui, sans-serif';
  footer.textContent = `Generated on ${new Date().toLocaleDateString()} from euler.timvarley.dev`;
  
  container.appendChild(footer);

  return container;
}


// --- Helpers ---

export function downloadPDF(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function sharePDF(blob: Blob, title: string, text?: string): Promise<boolean> {
  if (!navigator.share || !navigator.canShare) {
    return false;
  }

  const file = new File([blob], `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`, { type: 'application/pdf' });

  if (!navigator.canShare({ files: [file] })) {
    return false;
  }

  try {
    await navigator.share({
      title,
      text: text || 'Check out this Euler problem solution!',
      files: [file],
    });
    return true;
  } catch (error) {
    return false;
  }
}

export function isWebShareSupported(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.share && !!navigator.canShare;
}