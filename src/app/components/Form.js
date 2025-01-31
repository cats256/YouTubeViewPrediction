"use client";

import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    upload_date: "",
    uploader_sub_count: "",
    title: "",
    is_age_limit: false,
    is_ads_enabled: false,
    is_comments_enabled: false,
    is_crawlable: false,
    is_live_content: false,
    has_subtitles: false,
    uploader: "",
    description: "",
    hashtags: "",
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    const hashtagsArray = formData.hashtags
      .split(",")
      .map((tag) => ({ text: tag.trim() }))
      .filter((tag) => tag.text !== "");

    const payload = {
      ...formData,
      uploader_sub_count: Number(formData.uploader_sub_count || 0),
      super_titles: hashtagsArray,
    };

    try {
      const res = await fetch("http://willbui256.pythonanywhere.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
          YouTube View Count Prediction From Metadata
        </h2>


        <div className="mb-6 p-4 border border-red-300 bg-red-50 rounded-lg">
          <p className="text-red-700 font-semibold text-lg mb-1">NOTE:</p>
          <p className="text-red-700 text-sm">
            Accidentally broke the model. Model optimization and tokenizer
            update are currently in place.
          </p>
        </div>

        <div className="mb-6 p-4 border-2 border-black-300 bg-black-50 rounded-lg">
          <p className="text-black-700 text-sm">
            This project helps content creators boost video views by optimizing their metadata.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Future Upload Date (YYYYMMDD)
            </label>
            <input
              type="text"
              name="upload_date"
              value={formData.upload_date}
              onChange={handleChange}
              placeholder="20250130"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Channel Subscriber Count
            </label>
            <input
              type="number"
              name="uploader_sub_count"
              value={formData.uploader_sub_count}
              onChange={handleChange}
              placeholder="12345"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Video Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the video title"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Video Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter the video description"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Hashtags (comma-separated)
            </label>
            <input
              type="text"
              name="hashtags"
              value={formData.hashtags}
              onChange={handleChange}
              placeholder="e.g., #tech, #vlog, #tutorial"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Channel Name
            </label>
            <input
              type="text"
              name="uploader"
              value={formData.uploader}
              onChange={handleChange}
              placeholder="Channel Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_age_limit"
                checked={formData.is_age_limit}
                onChange={handleCheckbox}
              />
              <span>Age Restriction?</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_ads_enabled"
                checked={formData.is_ads_enabled}
                onChange={handleCheckbox}
              />
              <span>Ads Enabled?</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_comments_enabled"
                checked={formData.is_comments_enabled}
                onChange={handleCheckbox}
              />
              <span>Comments Enabled?</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_crawlable"
                checked={formData.is_crawlable}
                onChange={handleCheckbox}
              />
              <span>Crawlable?</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_live_content"
                checked={formData.is_live_content}
                onChange={handleCheckbox}
              />
              <span>Live Content?</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="has_subtitles"
                checked={formData.has_subtitles}
                onChange={handleCheckbox}
              />
              <span>Has Subtitles?</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold">Predicted View Count:</h3>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
