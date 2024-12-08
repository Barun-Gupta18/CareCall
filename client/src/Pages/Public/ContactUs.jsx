import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";

function ContactUs() {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAJ97zN_MClQ8BnmJJOCY165S2QEYvbIis`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    };

    const initMap = () => {
      const mapOptions = {
        zoom: 11,
        scrollwheel: false,
        center: { lat: 23.822349, lng: 90.36542 },
        styles: [
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }, { lightness: 17 }] },
          { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 20 }] },
          { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }, { lightness: 17 }] },
          { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }] },
          { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 18 }] },
          { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 16 }] },
          { featureType: "poi", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 21 }] },
          { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dedede" }, { lightness: 21 }] },
          { elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }] },
          { elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }] },
          { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
          { featureType: "transit", elementType: "geometry", stylers: [{ color: "#f2f2f2" }, { lightness: 19 }] },
          { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#fefefe" }, { lightness: 20 }] },
          { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }] }
        ]
      };

      const mapElement = document.getElementById('map');
      const map = new window.google.maps.Map(mapElement, mapOptions);
      new window.google.maps.Marker({
        position: { lat: 40.67, lng: -73.94 },
        map: map,
        title: 'Snazzy!'
      });
    };

    if (!window.google) {
      loadGoogleMaps();
    } else {
      initMap();
    }
  }, []);

  async function onSubmit(data) {
    try {
      console.log(data)
      const url = Server_URL + "add-contant-us";
      const res = await axios.post(url, data);
      const { error, message } = res.data;
      if (error) {
        showErrorToast(message);
      } else {
        reset();
        showSuccessToast(message);
      }
    } catch (error) {
      showSuccessToast(error.message);
    }
  }

  useEffect(() => {
    setFocus("email");
  }, []);

  return (
    <>
      <div className="breadcrumb-banner-area ptb-120 bg-opacity" style={{ backgroundImage: 'url(assets/img/bg/6.jpg)' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text text-center">
                <h2>contact-us</h2>
                <p>Make's your life esay.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-3-area contact-2 contact-3 pt-120 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="contact-wrapper-3 mb-30">
                <div className="contact-3-text">
                  <h3>Leave Us a Message</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
                  <div className="col-lg-6">
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      placeholder="name"
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      placeholder="email"
                    />
                  </div>
                  <div className="col-lg-12">
                    <textarea {...register('message')} cols="30" rows="10" placeholder="message" id="message"></textarea>
                  </div>
                  <button >send message</button>
                </form>
                <p className="form-message"></p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-3-right-wrapper mb-30">
                <div className="contact-3-right-info">
                  <h3>Contact Us</h3>
                  <p>Bringing Expertise and Care Right to Your CareCall.</p>
                </div>
                <div className="contact-3-address">
                  <div className="contact-3-icon">
                    <i className="zmdi zmdi-pin"></i>
                  </div>
                  <div className="address-text">
                    <span className="location">Location :</span>
                    <span className="USA">House no. 122(c), Amritsar</span>
                  </div>
                </div>
                <div className="contact-3-address">
                  <div className="contact-3-icon">
                    <i className="zmdi zmdi-phone"></i>
                  </div>
                  <div className="address-text">
                    <span className="location">phone :</span>
                    <span className="USA">+00-0000-000</span>
                  </div>
                </div>
                <div className="contact-3-address">
                  <div className="contact-3-icon">
                    <i className="zmdi zmdi-email"></i>
                  </div>
                  <div className="address-text">
                    <span className="location">mail :</span>
                    <span className="USA">CareCall@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="map-area pb-120">
        <div className="container">
          <div id="map" style={{ height: '400px', width: '100%' }}></div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
