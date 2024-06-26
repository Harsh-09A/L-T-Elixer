(function () {
  // emailjs.init("to9PlFrMMimgruuH0");
  emailjs.init("RRvCRcSEd0Ze8J6AU"); /*L&T*/
  // emailjs.init("BnRoAjGd5ec2E2VQn");
})();

// Get IP Address
async function getIpAddress() {
  try {
    const response = await fetch("https://api.ipify.org");
    const ip = await response.text();
    console.log(`IP: ${ip}`);
    return ip;
  } catch (error) {
    console.log(error);
    return null; // or throw error if you want to handle it differently
  }
}

//
async function sendLeadData(lead_user_name, lead_user_contact) {
  try {
    const url = "https://hook.us1.make.com/dw06pews9ew3fptiuqotvud2dtpfadud";
    const leadData = {
      lead_name: lead_user_name,
      lead_country: "91",
      lead_number: lead_user_contact,
      project_id: "iLtbOO10SJurAnmZsSNNUg",
      lead_provider_id: "0Uf4Zrgx4moV/w3Dbes3u4Ur00bmEa8sHSqgKELunWU=",
      ad_platform_name: "Google Ads",
      ad_platform_id: 1,
      ad_campaign_id: "21415960499",
      utm_url:
        "{lpurl}?utm_medium=paidsearch&utm_source=google&utm_campaign={_campaign}&utm_term={_adgroup}&utm_content={keyword}",
      utm_medium: "paidsearch",
      utm_source: "google",
    };

    // Specifying headers in the config object
    const config = { headers: { "Content-Type": "application/json" } };
    // console.log(leadData);
    const response = await axios.post(url, leadData, config);
    console.log(
      `Lead Captured ${response.data} with status ${response.status}`
    );
  } catch (error) {
    console.error(error);
  }
}

// Form Submit
const handleFormSubmit = async (
  formId,
  nameField,
  emailField,
  phoneField,
  privacyField
) => {
  const templateParams = {
    user_name: document.getElementById(nameField).value,
    // user_email: document.getElementById(emailField).value,
    contact_number: document.getElementById(phoneField).value,
    privacy_check: document.getElementById(privacyField).value,
    ip_address: await getIpAddress(),

    to_email: "digital@hotspot.realty",
    company_name: " L&T Elixir ",
  };

  await sendLeadData(templateParams.user_name, templateParams.contact_number);

  // Send Form
  emailjs.send("contact_service", "contact_form", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      // alert("Message Sent Final");
      document.getElementById(formId).reset();
      if (response.status === 200) {
        window.location.href = "thank-you.html";
      }
    },
    function (error) {
      console.log("FAILED...", error);
      alert("Message Not Sent");
    }
  );
};

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      handleFormSubmit(
        "contact-form",
        "user_name",
        "user_email",
        "contact_number",
        "privacy_check"
      );
    });

  document
    .getElementById("contact-form-modal")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      handleFormSubmit(
        "contact-form-modal",
        "user_name_modal",
        "user_email_modal",
        "contact_number_modal",
        "privacy_check_modal"
      );
    });
};
