'use client';

import { useState, useEffect } from 'react';
import LoadingDots from '@/components/loading-dots';

interface ContentCreator {
  id?: string;
  name: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    youtube?: string;
    twitch?: string;
    instagram?: string;
    tiktok?: string;
    twitter?: string;
  };
  featured: boolean;
  order: number;
}

export default function ContentCreatorsManager() {
  const [creators, setCreators] = useState<ContentCreator[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingCreator, setEditingCreator] = useState<ContentCreator | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState<ContentCreator>({
    name: '',
    bio: '',
    imageUrl: '',
    socialLinks: {},
    featured: false,
    order: 0,
  });

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/content-creators');
      const data = await response.json();
      setCreators(data.creators || []);
    } catch (err) {
      console.error('Error fetching content creators:', err);
      setError('Failed to load content creators');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.bio || !formData.imageUrl) {
      setError('Name, bio, and image URL are required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const url = '/api/admin/content-creators';
      const method = editingCreator ? 'PUT' : 'POST';
      const body = editingCreator 
        ? { ...formData, id: editingCreator.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to save content creator');
      }

      setSuccess(editingCreator ? 'Content creator updated!' : 'Content creator created!');
      await fetchCreators();
      resetForm();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving content creator:', err);
      setError('Failed to save content creator');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (creator: any) => {
    setEditingCreator(creator);
    setFormData({
      name: creator.name,
      bio: creator.bio,
      imageUrl: creator.imageUrl,
      socialLinks: creator.socialLinks || {},
      featured: creator.featured || false,
      order: creator.order || 0,
    });
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content creator?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/content-creators?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete content creator');
      }

      setSuccess('Content creator deleted successfully!');
      await fetchCreators();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting content creator:', err);
      setError('Failed to delete content creator');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      bio: '',
      imageUrl: '',
      socialLinks: {},
      featured: false,
      order: 0,
    });
    setEditingCreator(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingDots className="bg-white" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gaming-800/50 backdrop-blur-sm rounded-xl p-8 border border-accent-primary/20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Content Creators</h2>
            <p className="text-gaming-300">
              Manage content creators and collaborators to display on the landing page.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-6 py-2 rounded-lg hover:shadow-neon-purple transition-all font-medium"
          >
            {showForm ? 'Cancel' : '+ Add Creator'}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-accent-red/10 border border-accent-red/30 text-accent-red">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-accent-green/10 border border-accent-green/30 text-accent-green">
            {success}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 bg-gaming-900/50 rounded-lg p-6 border border-accent-primary/10">
            <h3 className="text-xl font-semibold text-white mb-4">
              {editingCreator ? 'Edit Content Creator' : 'Add New Content Creator'}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">
                  Name <span className="text-accent-red">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gaming-800 border border-accent-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-primary"
                  placeholder="Creator name"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Image URL <span className="text-accent-red">*</span>
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-gaming-800 border border-accent-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-primary"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-white mb-2 font-medium">
                  Bio <span className="text-accent-red">*</span>
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-gaming-800 border border-accent-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-primary"
                  rows={3}
                  placeholder="Brief bio about the content creator"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">YouTube</label>
                <input
                  type="url"
                  value={formData.socialLinks.youtube || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    socialLinks: { ...formData.socialLinks, youtube: e.target.value }
                  })}
                  className="w-full bg-gaming-800 border border-accent-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-primary"
                  placeholder="https://youtube.com/@username"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Twitch</label>
                <input
                  type="url"
                  value={formData.socialLinks.twitch || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    socialLinks: { ...formData.socialLinks, twitch: e.target.value }
                  })}
                  className="w-full bg-gaming-800 border border-accent-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-primary"
                  placeholder="https://twitch.tv/username"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Instagram</label>
                <input
                  type="url"
                  value={formData.socialLinks.instagram || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                  })}
                  className="w-full bg-gaming-800 border border-accent-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-primary"
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">TikTok</label>
                <input
                  type="url"
                  value={formData.socialLinks.tiktok || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    socialLinks: { ...formData.socialLinks, tiktok: e.target.value }
                  })}
                  className="w-full bg-gaming-800 border border-accent-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-primary"
                  placeholder="https://tiktok.com/@username"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Twitter/X</label>
                <input
                  type="url"
                  value={formData.socialLinks.twitter || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                  })}
                  className="w-full bg-gaming-800 border border-accent-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-primary"
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full bg-gaming-800 border border-accent-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-primary"
                  placeholder="0"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 rounded border-accent-primary/20 bg-gaming-800 text-accent-primary focus:ring-accent-primary"
                  />
                  <span className="ml-2 text-white font-medium">Featured on Landing Page</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-6 py-2 rounded-lg hover:shadow-neon-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
              >
                {saving ? <LoadingDots className="bg-white" /> : (editingCreator ? 'Update Creator' : 'Add Creator')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gaming-700 text-white px-6 py-2 rounded-lg hover:bg-gaming-600 transition-all font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Content Creators List */}
        <div className="space-y-4">
          {creators.length === 0 ? (
            <p className="text-gaming-300 text-center py-8">
              No content creators yet. Add your first one!
            </p>
          ) : (
            creators.map((creator: any) => (
              <div
                key={creator._id}
                className="bg-gaming-900/50 rounded-lg p-6 border border-accent-primary/10 hover:border-accent-primary/30 transition-all"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={creator.imageUrl}
                    alt={creator.name}
                    className="w-24 h-24 rounded-lg object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/150';
                    }}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                          {creator.name}
                          {creator.featured && (
                            <span className="text-xs bg-accent-primary/20 text-accent-primary px-2 py-1 rounded">
                              Featured
                            </span>
                          )}
                        </h3>
                        <p className="text-gaming-400 text-sm">Order: {creator.order}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(creator)}
                          className="bg-accent-primary/20 text-accent-primary px-4 py-1 rounded hover:bg-accent-primary/30 transition-all text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(creator._id)}
                          className="bg-accent-red/20 text-accent-red px-4 py-1 rounded hover:bg-accent-red/30 transition-all text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gaming-300 mb-3">{creator.bio}</p>
                    
                    {Object.keys(creator.socialLinks || {}).length > 0 && (
                      <div className="flex gap-3">
                        {creator.socialLinks.youtube && (
                          <a
                            href={creator.socialLinks.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gaming-400 hover:text-accent-primary transition-colors"
                          >
                            YouTube
                          </a>
                        )}
                        {creator.socialLinks.twitch && (
                          <a
                            href={creator.socialLinks.twitch}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gaming-400 hover:text-accent-primary transition-colors"
                          >
                            Twitch
                          </a>
                        )}
                        {creator.socialLinks.instagram && (
                          <a
                            href={creator.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gaming-400 hover:text-accent-primary transition-colors"
                          >
                            Instagram
                          </a>
                        )}
                        {creator.socialLinks.tiktok && (
                          <a
                            href={creator.socialLinks.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gaming-400 hover:text-accent-primary transition-colors"
                          >
                            TikTok
                          </a>
                        )}
                        {creator.socialLinks.twitter && (
                          <a
                            href={creator.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gaming-400 hover:text-accent-primary transition-colors"
                          >
                            Twitter/X
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
