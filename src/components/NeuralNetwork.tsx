import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const NeuralNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Neural network configuration
    const nodeCount = 80; // Number of nodes
    const maxDistance = 150; // Max distance for connections
    const nodeRadius = 2;
    const nodes: Node[] = [];

    // Initialize nodes with random positions and velocities
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5, // Slower movement
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      // Clear canvas with fade effect for trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Draw connections to nearby nodes
        nodes.forEach((otherNode, j) => {
          if (i === j) return;

          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.5;

            // Gradient colors - neon blue to purple
            const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
            gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`); // Blue
            gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity})`); // Purple
            gradient.addColorStop(1, `rgba(236, 72, 153, ${opacity})`); // Pink

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });

        // Draw node
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeRadius * 2);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)'); // Purple center
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.5)'); // Blue middle
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)'); // Transparent edge

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default NeuralNetwork;
