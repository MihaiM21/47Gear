'use client';

import { useState, useEffect } from 'react';

interface ProductStory {
  productHandle: string;
  productTitle: string;
  story: string;
  lastUpdated: string;
}

interface Product {
  handle: string;
  title: string;
}

export default function ProductStoriesManager() {
  const [stories, setStories] = useState<ProductStory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [storyText, setStoryText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch existing stories
      const storiesRes = await fetch('/api/product-stories');
      const storiesData = await storiesRes.json();
      setStories(storiesData.stories || []);

      // Fetch products from Shopify
      const productsRes = await fetch('/api/graphql/storefront', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query getProducts {
              products(first: 100) {
                edges {
                  node {
                    handle
                    title
                  }
                }
              }
            }
          `,
        }),
      });

      const productsData = await productsRes.json();
      const productsList = productsData.data?.products?.edges?.map((edge: any) => edge.node) || [];
      setProducts(productsList);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (handle: string) => {
    setSelectedProduct(handle);
    setError('');
    setSuccess('');
    
    // Load existing story if available
    const existingStory = stories.find(s => s.productHandle === handle);
    setStoryText(existingStory?.story || '');
  };

  const handleSaveStory = async () => {
    if (!selectedProduct || !storyText.trim()) {
      setError('Please select a product and enter a story');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const product = products.find(p => p.handle === selectedProduct);
      
      const response = await fetch('/api/product-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productHandle: selectedProduct,
          productTitle: product?.title || selectedProduct,
          story: storyText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save story');
      }

      setSuccess('Story saved successfully!');
      await fetchData(); // Refresh stories
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving story:', err);
      setError('Failed to save story');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStory = async (handle: string) => {
    if (!confirm('Are you sure you want to delete this story?')) {
      return;
    }

    try {
      const response = await fetch(`/api/product-stories?handle=${handle}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete story');
      }

      setSuccess('Story deleted successfully!');
      await fetchData();
      
      if (selectedProduct === handle) {
        setSelectedProduct('');
        setStoryText('');
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting story:', err);
      setError('Failed to delete story');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Product Stories</h2>
        <p className="text-gaming-300">Create unique stories for each mousepad</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gaming-800/60 backdrop-blur-xl rounded-xl shadow-elegant border border-accent-primary/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gaming-300 mb-1">Total Products</div>
              <div className="text-3xl font-bold text-white">{products.length}</div>
            </div>
            <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-gaming-800/60 backdrop-blur-xl rounded-xl shadow-elegant border border-accent-secondary/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gaming-300 mb-1">Stories Created</div>
              <div className="text-3xl font-bold text-white">{stories.length}</div>
            </div>
            <div className="w-12 h-12 bg-accent-secondary/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-gaming-800/60 backdrop-blur-xl rounded-xl shadow-elegant border border-accent-yellow/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gaming-300 mb-1">Remaining</div>
              <div className="text-3xl font-bold text-white">{products.length - stories.length}</div>
            </div>
            <div className="w-12 h-12 bg-accent-yellow/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-accent-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-accent-red/10 border border-accent-red/30 text-accent-red rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-accent-green/10 border border-accent-green/30 text-accent-green rounded-lg">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="bg-gaming-800/60 backdrop-blur-xl rounded-xl shadow-elegant border border-accent-primary/20 p-6 space-y-6">
          <h3 className="text-xl font-semibold text-white">Create/Edit Story</h3>

          {/* Product Selector */}
          <div>
            <label className="block text-sm font-medium text-gaming-300 mb-2">
              Select Product
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => handleProductSelect(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gaming-900/50 border border-accent-primary/20 text-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all"
            >
              <option value="">-- Choose a product --</option>
              {products.map((product) => {
                const hasStory = stories.some(s => s.productHandle === product.handle);
                return (
                  <option key={product.handle} value={product.handle}>
                    {product.title} {hasStory ? '✓' : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Story Editor */}
          {selectedProduct && (
            <>
              <div>
                <label className="block text-sm font-medium text-gaming-300 mb-2">
                  Product Story
                </label>
                <textarea
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  rows={12}
                  placeholder="Write a compelling story about this mousepad... What makes it special? What's its origin? Who is it designed for?"
                  className="w-full px-4 py-3 rounded-lg bg-gaming-900/50 border border-accent-primary/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all resize-none"
                />
                <div className="mt-2 text-xs text-gaming-400">
                  {storyText.length} characters
                </div>
              </div>

              <button
                onClick={handleSaveStory}
                disabled={saving}
                className="w-full px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold rounded-lg hover:shadow-neon-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Story'}
              </button>
            </>
          )}
        </div>

        {/* Existing Stories */}
        <div className="bg-gaming-800/60 backdrop-blur-xl rounded-xl shadow-elegant border border-accent-primary/20 p-6 space-y-4">
          <h3 className="text-xl font-semibold text-white">Existing Stories</h3>

          {stories.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-gaming-400">No stories created yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {stories.map((story) => (
                <div
                  key={story.productHandle}
                  className="bg-gaming-900/50 border border-accent-primary/10 rounded-lg p-4 hover:border-accent-primary/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{story.productTitle}</h4>
                      <p className="text-xs text-gaming-400 mt-1">
                        Updated: {formatDate(story.lastUpdated)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleProductSelect(story.productHandle)}
                        className="px-3 py-1 text-xs bg-accent-primary/20 text-accent-secondary rounded hover:bg-accent-primary/30 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStory(story.productHandle)}
                        className="px-3 py-1 text-xs bg-accent-red/20 text-accent-red rounded hover:bg-accent-red/30 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gaming-300 line-clamp-2">{story.story}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
