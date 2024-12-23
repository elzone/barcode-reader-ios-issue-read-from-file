import { Browser } from "@capacitor/browser";
import { SplashScreen } from "@capacitor/splash-screen";
import { BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { FilePicker } from '@capawesome/capacitor-file-picker';

window.customElements.define(
  "capacitor-welcome",
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `
    <main>
      <button id="open-file-button" style="position: absolute; top: 200px; left: 50px;">Open file with QR code</button>
    </main>
    `;
    }

    connectedCallback() {
      const self = this;

      const getBarCode = async (path) => {
        const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
          path,
          formats: [BarcodeFormat.QrCode],
        });

        console.log(barcodes[0].rawValue);
      };

      const handleClick = async () => {
        const { files } = await FilePicker.pickImages({ limit: 1 });
        const path = files[0]?.path;

        if (!path) {
          return;
        }

        await getBarCode(path);
      };

      self.shadowRoot
        .querySelector("#open-file-button")
        .addEventListener("click", handleClick);

    }
  },
);
