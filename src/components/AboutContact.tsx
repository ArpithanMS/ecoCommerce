import React from 'react';
import { X, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

interface AboutContactProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutContact: React.FC<AboutContactProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-semibold text-[#9F8170]">About Us</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#DEAA79] rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-[#9F8170]" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* About Us Section */}
              <div>
                <h3 className="text-xl font-semibold text-[#9F8170] mb-4">About Village Eco</h3>
                <div className="space-y-4 text-[#9F8170]">
                  <p>
                    Welcome to Village Eco, where nature meets wellness. We are passionate about bringing you the finest organic products that nurture your body, mind, and soul.
                  </p>
                  <p>
                    Founded with a vision to promote natural living, we carefully source and handcraft each product using traditional methods passed down through generations. Our collection includes premium essential oils, therapeutic massage oils, and beautiful handicrafts made by skilled artisans.
                  </p>
                  <p>
                    Every product in our collection is:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>100% organic and natural</li>
                    <li>Ethically sourced from trusted suppliers</li>
                    <li>Handcrafted with love and care</li>
                    <li>Free from harmful chemicals and additives</li>
                    <li>Supporting local artisans and communities</li>
                  </ul>
                  <p>
                    We believe in the power of nature to heal, rejuvenate, and inspire. Join us on this journey towards a more natural and sustainable lifestyle.
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="text-xl font-semibold text-[#9F8170] mb-4">Get In Touch</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-[#759B8C]" />
                    <div>
                      <p className="font-medium text-[#9F8170]">Email</p>
                      <p className="text-[#9F8170]">contact@organicessence.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-[#759B8C]" />
                    <div>
                      <p className="font-medium text-[#9F8170]">Phone</p>
                      <p className="text-[#9F8170]">+91 01234 56789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-[#759B8C]" />
                    <div>
                      <p className="font-medium text-[#9F8170]">WhatsApp</p>
                      <p className="text-[#9F8170]">+91 01234 56789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-[#759B8C] mt-1" />
                    <div>
                      <p className="font-medium text-[#9F8170]">Address</p>
                      <p className="text-[#9F8170]">
                        Village Eco Shop<br />
                        Pookode Lake Road, Pookode<br />
                        Vythiri, Wayanad 673576<br />
                        Kerala, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <a
                    href="mailto:contact@organicessence.com"
                    className="flex items-center justify-center space-x-2 w-full bg-[#DEAA79] text-[#9F8170] py-3 rounded-lg font-medium hover:bg-[#D2B48C] transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Email</span>
                  </a>
                  
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full bg-[#87A96B] text-white py-3 rounded-lg font-medium hover:bg-[#759B8C] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#9F8170] mb-4">Visit Our Store</h3>
              <div className="bg-[#87A96B] rounded-lg p-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1954.5673208081585!2d76.0260145888445!3d11.542197925134282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba66d88a8d13789%3A0xd47bcc0d3875a678!2sPookode%20Lake!5e0!3m2!1sen!2sin!4v1751619197495!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6 bg-[#87A96B] rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Business Hours</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <p><strong>Monday - Friday:</strong> 9:00 AM - 7:00 PM</p>
                  <p><strong>Saturday:</strong> 10:00 AM - 6:00 PM</p>
                </div>
                <div>
                  <p><strong>Sunday:</strong> 11:00 AM - 5:00 PM</p>
                  <p><strong>Holidays:</strong> Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContact;