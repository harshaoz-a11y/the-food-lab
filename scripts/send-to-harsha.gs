// Email relay for the Baseline form at thefoodlab.in/f/ty3bqakp9m/.
// The form posts the answers here when the client presses "Send to Harsha"; this emails them to harsha@thefoodlab.in
// and keeps nothing: no sheet, no log of the answers.
//
// Setup, once: script.google.com → New project → paste this file over the starter code → Deploy → New deployment →
// type "Web app", Execute as "Me", Who has access "Anyone" → Deploy → copy the Web app URL into MAIL_RELAY in the form page.

const TO = "harsha@thefoodlab.in";
const KEY = "foodlab-baseline"; // must match RELAY_KEY in the form page

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.k !== KEY || !d.body) return out("ignored");
    const subject = String(d.subject || "BASELINE FORM").slice(0, 120);
    MailApp.sendEmail({ to: TO, subject: subject, body: String(d.body).slice(0, 20000), name: "The Food Lab form" });
    return out("ok");
  } catch (err) {
    return out("error");
  }
}

function out(s) { return ContentService.createTextOutput(s); }
