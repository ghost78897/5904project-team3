export function TravelRoutePage() {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://storymaps.arcgis.com/stories/b836c5fcc6f64d37b5f292542d090ab4"
        width="100%"
        height="100%"
        style={{ 
          border: 0,
          minHeight: "100vh"
        }}
        allowFullScreen
        allow="geolocation"
      ></iframe>
    </div>
  );
}
