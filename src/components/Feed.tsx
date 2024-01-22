// src/components/Feed.tsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import Modal from './Modal'; // Import the Modal component

interface FeedProps {
  // Define your props as needed
}

interface BrandData {
  name: string;
  logo: string;
  // Add more properties as needed
}

export interface FeedData {
  brand: BrandData;
  brandName: string;
  feedTitle: string;
  banner_image: string;
  starts_on: string;
  banner_text: string;
  ad_1_image: string;
  ad_2_image: string;
}

const Feed: React.FC<FeedProps> = () => {
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const [visibleFeeds, setVisibleFeeds] = useState<number>(5);
  const [selectedFeedIndex, setSelectedFeedIndex] = useState<number | null>(null); // Track selected feed index
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch feeds with pagination from the updated server endpoint
        const response = await axios.get(`http://localhost:4000/api/feed?limit=${visibleFeeds}`);
        setFeeds(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [visibleFeeds]);

  const handleScroll = () => {
    const container = containerRef.current;
    // Check if the user has scrolled to the bottom
    if (container && container.scrollHeight - container.scrollTop === container.clientHeight) {
      // Fetch the next set of feeds by increasing the limit
      setVisibleFeeds((prevVisibleFeeds) => prevVisibleFeeds + 5);
    }
  };

  const openModal = (index: number) => {
    setSelectedFeedIndex(index);
  };

  const closeModal = () => {
    setSelectedFeedIndex(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        overflowY: 'auto',
      }}
      ref={containerRef}
      onScroll={handleScroll}
    >
      {feeds.map((feed, index) => (
        <Card key={index} style={{ margin: '10px', width: '300px' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Add onClick handler to open the modal on image click */}
            <img
              src={feed.banner_image}
              alt="Banner"
              style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', cursor: 'pointer' }}
              onClick={() => openModal(index)}
            />
            <Typography variant="h6">{feed.brand.name}</Typography>
            <Typography variant="subtitle1">{feed.brandName}</Typography>
            <Typography variant="body2" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
              {feed.feedTitle}
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'flex-end' }}>
            <Button size="small" color="primary">
              Join Brief Now
            </Button>
          </CardActions>
        </Card>
      ))}
      
      {/* Render the modal component */}
      {selectedFeedIndex !== null && (
        <Modal
          feed={feeds[selectedFeedIndex]}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Feed;
