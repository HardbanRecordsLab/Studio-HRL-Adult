

async function test() {
  const payload = {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "123456789",
    birthDate: "1990-01-01",
    height: "170",
    weight: "60",
    motivation: "I want to be a star",
    consentAge: true,
    consentTerms: true,
    photo1: "https://example.com/photo.jpg",
    photo2: "https://example.com/photo2.jpg",
    video: "https://example.com/video.mp4"
  };

  try {
    const res = await fetch('http://localhost:3000/api/casting/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
