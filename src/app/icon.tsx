import { ImageResponse } from 'next/og';

// Route segment config
export const dynamic = 'force-static';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: '#0F5132', // Emerald green background
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '50%',
                }}
            >
                🌙
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
