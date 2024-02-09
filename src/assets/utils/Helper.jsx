import html2pdf  from 'html2pdf.js';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';

export class Helper {

    static copyInputText = async (id) => {
        try {
            // Get the input field
            var inputField = document.getElementById(id);

            // Use the Clipboard API to write text to the clipboard
            await navigator.clipboard.writeText(inputField.value);

            // Alert the user that the text has been copied
            console.log("Text copied: " + inputField.value);

            return true;
        } catch (err) {
            console.error('Unable to copy text: ', err);
            return false;
        }
    }

    static downloadWebPage = async () => {
        try {
            const node = document.getElementById("hafez"); //document.body; // Replace this with the specific element you want to capture

            // Check if the node exists and has content
            if (!node || !node.firstChild) {
                console.error('Error: Node is not ready or empty.');
                return;
            }

            // Convert the HTML element to a PNG Base64 string
            const base64String = await domtoimage.toPng(node);

            // Create a link element
            var link = document.createElement("a");

            // Set the href attribute with the base64 string
            link.href = base64String;

            // Set the download attribute with the desired file name
            link.download = "Hafez_poem";

            // Create a click event to simulate the download
            var clickEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window
            });

            // Dispatch the click event
            link.dispatchEvent(clickEvent);

            // Remove the link from the DOM
            if (document.body.contains(link)) {
                document.body.removeChild(link);
            }
        } catch (err) {
            console.error('Error downloading webpage:', err);
        }
    }

    static setLanguage = (lang) => {
        var htmlElement = document.querySelector('html');
        var dir = (lang == "fa")? "rtl" : "ltr";

        // Set the lang attribute
        htmlElement.setAttribute('lang', lang);

        // Set the dir attribute
        htmlElement.setAttribute('dir', dir);
    }

    static getLanguage = () => {
        var htmlElement = document.querySelector('html');
        return  htmlElement.getAttribute('lang');
    }
    
}