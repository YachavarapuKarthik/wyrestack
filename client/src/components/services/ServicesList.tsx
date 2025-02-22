import "../../css/services/services.css";

const services = [
  { title: "Website Development", description: "Building responsive and SEO-friendly websites tailored to business needs." },
  { title: "App Development", description: "Creating mobile and web applications for various platforms with modern technologies." },
  { title: "Online Business Development", description: "Helping businesses establish a strong online presence and digital strategy." },
  { title: "Software Services", description: "Providing custom software solutions for automation, management, and productivity." },
  { title: "Product Support and Maintenance", description: "Ensuring the smooth operation, updates, and security of existing products." }
];
  
  function ServicesList() {
    return (
      <>
      <div className="Ocontainer">
        <div className="Oinfo">
            <div className="Omatter">
              <h2>Services Offered</h2>
            </div>
          </div>
        </div>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          {services.map((service, index) => (
            <div key={index} className="ag-courses_item">
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">{service.title}</div>
                {service.description && (
                  <div className="ag-courses-item_date-box">
                    Start: <span className="ag-courses-item_date">{service.description}</span>
                  </div>
                )}
              </a>
            </div>
          ))}
        </div>
      </div>
      </>
     
    );
  }

export default ServicesList;