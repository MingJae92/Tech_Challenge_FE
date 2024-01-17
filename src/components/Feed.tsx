// src/components/Feed.tsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

interface FeedProps {
  // Define your props as needed
}

interface BrandData {
  name: string;
  logo: string;
  // Add more properties as needed
}

interface FeedData {
  brand: BrandData;
  brandName: string;
  feedTitle: string;
  banner_image: string; // Add the image property
  // Add more properties as needed
}

const Feed: React.FC<FeedProps> = () => {
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const [visibleFeeds, setVisibleFeeds] = useState<number>(5);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the server with the specified limit
        const response = await axios.get(`http://localhost:4000/api/feed?limit=${visibleFeeds}`);
        console.log('Response data:', response.data);
        // Update the state with the fetched data
        setFeeds(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data on initial render
    fetchData();
  }, [visibleFeeds]);

  // Handle scrolling to load more feeds
  const handleScroll = () => {
    const container = containerRef.current;
    if (container && container.scrollHeight - container.scrollTop === container.clientHeight) {
      // Load the next 5 feeds when reaching the bottom
      setVisibleFeeds((prevVisibleFeeds) => prevVisibleFeeds + 5);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        overflowY: 'auto', // Enable scrolling when there are more feeds
      }}
      ref={containerRef}
      onScroll={handleScroll}
    >
      {feeds.map((feed, index) => (
        <Card key={index} style={{ margin: '10px', width: '300px' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h6">{feed.brand.name}</Typography>
            <Typography variant="subtitle1">{feed.brandName}</Typography>
            <img src={feed.banner_image} alt="Banner" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />
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
    </div>
  );
};

export default Feed;