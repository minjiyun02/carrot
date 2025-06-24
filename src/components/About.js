import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>About GovDeals</h1>
      <p className="about-description">
        GovDeals is an online marketplace that allows government agencies, educational institutions, and other public sector organizations to sell surplus and confiscated items to the public. From vehicles and heavy equipment to electronics and real estate, GovDeals provides buyers with the opportunity to bid on thousands of items in auction-style listings.
      </p>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h4>What is GovDeals?</h4>
          <p>GovDeals is an auction platform that connects government agencies and institutions with buyers through competitive bidding.</p>
        </div>

        <div className="faq-item">
          <h4>Who can buy on GovDeals?</h4>
          <p>Anyone with an account can place bids on available listings. There are no restrictions on who can buy unless otherwise stated in a listing.</p>
        </div>

        <div className="faq-item">
          <h4>How do I place a bid?</h4>
          <p>Simply sign in to your account, go to any listing, and click "Place Bid". You’ll be prompted to enter your bid amount.</p>
        </div>

        <div className="faq-item">
          <h4>Are the items new or used?</h4>
          <p>Most items sold on GovDeals are used or surplus items previously owned by government agencies. Each listing includes details on condition.</p>
        </div>

        <div className="faq-item">
          <h4>Is there a buyer’s fee?</h4>
          <p>Some listings may include a buyer’s premium. This will be stated clearly in the listing terms.</p>
        </div>

        <div className="faq-item">
          <h4>What payment methods are accepted?</h4>
          <p>Payment methods vary by listing but generally include credit card, PayPal, or wire transfer. Check the listing for specific instructions.</p>
        </div>

        <div className="faq-item">
          <h4>Can I inspect an item before bidding?</h4>
          <p>Yes, many sellers allow item inspections by appointment. Contact the seller through the Q&A section in the listing to arrange a visit.</p>
        </div>
      </section>
    </div>
  );
}

export default About;
