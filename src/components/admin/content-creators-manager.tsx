'use client';

import { useState, useEffect } from 'react';
import LoadingDots from '@/components/loading-dots';

interface ContentCreator {
  id?: string;
  name: string;
  bio: string;
  imageUrl: string;
  link?: string;
  featured: boolean;
}

export default function ContentCreatorsManager() {
  const [creators, setCreators] = useState<ContentCreator[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingCreator, setEditingCreator] = useState<ContentCreator | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState<ContentCreator>({
    name: '',
    bio: '',
    imageUrl: '',
    link: '',
    featured: false,
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!selectedFile) {
      throw new Error('No file selected');
    }

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', selectedFile);

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const data = await response.json();
      return data.imageUrl;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.bio) {
      setError('Name and bio are required');
      return;
    }

    // Check if we have either a file or an image URL
    if (!selectedFile && !formData.imageUrl) {
      setError('Please upload an image or provide an image URL');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Upload image if a file was selected
      let imageUrl = formData.imageUrl;
      if (selectedFile) {
        imageUrl = await uploadImage();
      }

      const url = '/api/admin/content-creators';
      const method = editingCreator ? 'PUT' : 'POST';
      const body = editingCreator 
        ? { ...formData, imageUrl, id: editingCreator.id }
        : { ...formData, imageUrl };

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
      setError(err instanceof Error ? err.message : 'Failed to save content creator');
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
      link: creator.link || '',
      featured: creator.featured || false,
    });
    setPreviewUrl(creator.imageUrl);
    setSelectedFile(null);
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
      link: '',
      featured: false,
    });
    setSelectedFile(null);
    setPreviewUrl('');
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

              <div className="md:col-span-2">
                <label className="block text-white mb-2 font-medium">
                  Link URL
                </label>
                <input
                  type="text"
                  value={formData.link || ''}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full bg-gaming-800 border border-accent-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-primary"
                  placeholder="https://example.com (optional - makes image clickable)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-white mb-2 font-medium">
                  Image <span className="text-accent-red">*</span>
                </label>
                <div className="space-y-4">
                  {/* File Upload */}
                  <div>
                    <label className="block cursor-pointer">
                      <div className="w-full bg-gaming-800 border border-accent-primary/20 rounded-lg px-4 py-3 text-white hover:border-accent-primary transition-colors text-center">
                        {selectedFile ? (
                          <span className="text-accent-primary">Selected: {selectedFile.name}</span>
                        ) : (
                          <span className="text-gaming-400">Click to upload image (or use URL below)</span>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Or divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-gaming-400 text-sm">OR</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                  </div>

                  {/* Image URL Input */}
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, imageUrl: e.target.value });
                      setPreviewUrl(e.target.value);
                      setSelectedFile(null);
                    }}
                    className="w-full bg-gaming-800 border border-accent-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-primary"
                    placeholder="https://example.com/image.jpg or /path/to/image.jpg"
                  />

                  {/* Image Preview */}
                  {previewUrl && (
                    <div className="mt-4">
                      <p className="text-white text-sm mb-2">Preview:</p>
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-32 h-32 object-contain rounded-lg border border-accent-primary/20 bg-gaming-900"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/150?text=Invalid+Image';
                        }}
                      />
                    </div>
                  )}
                </div>
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
                disabled={saving || uploading}
                className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-6 py-2 rounded-lg hover:shadow-neon-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
              >
                {(saving || uploading) ? (
                  <>
                    <LoadingDots className="bg-white" />
                    {uploading && <span className="ml-2">Uploading...</span>}
                  </>
                ) : (
                  editingCreator ? 'Update Creator' : 'Add Creator'
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={saving || uploading}
                className="bg-gaming-700 text-white px-6 py-2 rounded-lg hover:bg-gaming-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                key={creator.id}
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
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(creator)}
                          className="bg-accent-primary/20 text-accent-primary px-4 py-1 rounded hover:bg-accent-primary/30 transition-all text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(creator.id)}
                          className="bg-accent-red/20 text-accent-red px-4 py-1 rounded hover:bg-accent-red/30 transition-all text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gaming-300 mb-3">{creator.bio}</p>
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
