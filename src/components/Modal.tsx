import React, { useEffect, useCallback, useState } from 'react';
import { Dialog, DialogContent, Button, Typography } from '@mui/material';
import { FeedData } from './Feed'; // Adjust the path as needed

interface Comment {
  user: {
    avatar: string;
    name: string;
  };
  comment: string;
}

interface ModalProps {
  feed: FeedData;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ feed, onClose }) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const comments: Comment[] = [
    { user: { avatar: 'https://www.xtrafondos.com/wallpapers/vertical/bart-simpson-minimalista-3459.jpg', name: 'Bart' }, comment: 'Great content!' },
    { user: { avatar: 'https://img.freepik.com/premium-vector/ninja-girl-head-sport-logo_10051-954.jpg', name: 'Ninja' }, comment: 'Nice work!' },
    // Add more comments as needed
  ];

  const handleScroll = useCallback((direction: 'up' | 'down') => {
    const modalContent = document.getElementById('modal-content');
    if (!modalContent) return;

    const scrollIncrement = 100; // Adjust this value based on your preference

    if (direction === 'up') {
      modalContent.scrollTop = Math.max(0, modalContent.scrollTop - scrollIncrement);
    } else {
      modalContent.scrollTop = Math.min(modalContent.scrollHeight, modalContent.scrollTop + scrollIncrement);
    }

    setScrollPosition(modalContent.scrollTop);
  }, []);

  useEffect(() => {
    const handleMouseWheel = (event: WheelEvent) => {
      const modalContent = document.getElementById('modal-content');
      if (!modalContent) return;

      if (event.deltaY > 0) {
        handleScroll('down');
      } else {
        handleScroll('up');
      }
    };

    const modalContent = document.getElementById('modal-content');
    if (modalContent) {
      modalContent.addEventListener('wheel', handleMouseWheel);
      setScrollPosition(modalContent.scrollTop);
    }

    return () => {
      if (modalContent) {
        modalContent.removeEventListener('wheel', handleMouseWheel);
      }
    };
  }, [handleScroll]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogContent id="modal-content" style={{ display: 'flex', height: '100vh', overflowY: 'auto' }}>
        {/* Left side */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* First Item: Media */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
            <img
              src={feed.banner_image}
              alt="Banner"
              style={{ width: '55%', maxHeight: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Second Item: Feed details */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={feed.brand.logo} alt="Brand Logo" style={{ width: '50px', height: '50px', marginTop: '10px' }} />
            <Typography variant="h6">{feed.brand.name}</Typography>
            <Typography variant="h5" style={{ margin: '10px 0' }}>{feed.feedTitle}</Typography>
            <Typography variant="subtitle1">{feed.starts_on}</Typography>
            <Typography variant="body1">{feed.banner_text}</Typography>
            <img src={feed.ad_1_image} alt="Ad 1" style={{ width: '100%', height: 'auto', margin: '10px 0' }} />
            <img src={feed.ad_2_image} alt="Ad 2" style={{ width: '100%', height: 'auto', margin: '10px 0' }} />
          </div>
        </div>

        {/* Right side */}
        <div id="comments-container" style={{ width: 500, backgroundColor: '#f0f0f0', padding: '20px', overflowY: 'auto' }}>
          <img src={feed.brand.logo} alt="Brand Logo" style={{ width: '50px', height: '50px', marginBottom: '10px' }} />
          <Typography variant="h6">{feed.brand.name}</Typography>
          <div style={{ background: '#eeeeee', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
            {comments.map((comment, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                  src={comment.user.avatar}
                  alt={`Avatar ${index + 1}`}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                />
                <div>
                  <Typography variant="subtitle1">{comment.user.name}</Typography>
                  <Typography variant="body1">{comment.comment}</Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>

      {/* Close button */}
      <Button onClick={handleClose} style={{ position: 'absolute', top: 10, left: 10 }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#126AE8"/>
        <g clip-path="url(#clip0_3270_3545)">
        <path d="M26.5868 25.5233C26.9947 25.934 26.9947 26.6002 26.5868 27.0109C26.179 27.4216 25.5172 27.4216 25.1093 27.0109L19.9654 21.7933L14.7849 27.0092C14.377 27.4198 13.7152 27.4198 13.3073 27.0092C12.8994 26.5985 12.8995 25.9323 13.3073 25.5216L18.4896 20.3074L13.3059 15.0521C12.898 14.6414 12.898 13.9752 13.3059 13.5645C13.7138 13.1538 14.3755 13.1538 14.7834 13.5645L19.9654 18.8216L25.1459 13.6057C25.5537 13.195 26.2155 13.195 26.6234 13.6057C27.0313 14.0163 27.0313 14.6826 26.6234 15.0933L21.4411 20.3074L26.5868 25.5233Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_3270_3545">
        <rect width="14" height="15" fill="white" transform="translate(13 13)"/>
        </clipPath>
        </defs>
        </svg>

        </svg>
      </Button>

      {/* Up and down arrows */}
      <Button
        onClick={() => handleScroll('up')}
        disabled={scrollPosition === 0}
        style={{ position: 'absolute', top: '50%', left: '90%', transform: 'translate(-50%, -50%)' }}
      >
        {/* Up arrow SVG */}
      </Button>
      <Button
        onClick={() => handleScroll('down')}
        style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}
      >
        <svg width="40"  height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#126AE8"/>
        <g clip-path="url(#clip0_3270_3546)">
        <path d="M29.4328 17.4021L20.8482 25.6273C20.6016 25.8699 20.3321 26.0092 20.0625 26.0092C19.793 26.0092 19.5248 25.9095 19.3173 25.7087L10.7327 17.4835C10.3017 17.0724 10.2877 16.3901 10.7004 15.9607C11.1103 15.5283 11.7956 15.5142 12.2237 15.9284L20.0625 23.3992L27.9418 15.8523C28.3686 15.4382 29.055 15.4522 29.4651 15.8846C29.8779 16.3105 29.8639 16.9933 29.4328 17.4021Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_3270_3546">
        <rect width="20.125" height="23" fill="white" transform="translate(30.125 31) rotate(-180)"/>
        </clipPath>
        </defs>
        </svg>

      </Button>
    </Dialog>
  );
};

export default Modal;
