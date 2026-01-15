import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, Globe, MapPin, Building2 } from 'lucide-react';
import type { Post } from '../types/index';
import { LoadingSpinner } from './LoadingSpinner';
import { useApp } from '../hooks/useApp';

export const UserDetailView: React.FC = () => {
  const { selectedUser, setSelectedUser } = useApp();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedUser) return;
      
      try {
        setPostLoading(true);
        setPostError(null);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.id}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setPostError(errorMessage);
        console.error('Post fetch error:', err);
      } finally {
        setPostLoading(false);
      }
    };

    fetchPosts();
  }, [selectedUser]);

  if (!selectedUser) return null;

  return (
    <div className="space-y-6">
      <button
        onClick={() => setSelectedUser(null)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Users
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {selectedUser.name}
          </h1>
          <p className="text-gray-600">@{selectedUser.username}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Mail className="w-4 h-4" />
              <h3 className="text-sm font-medium">Email</h3>
            </div>
            <a
              href={`mailto:${selectedUser.email}`}
              className="text-lg text-blue-600 hover:underline break-all"
            >
              {selectedUser.email}
            </a>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Phone className="w-4 h-4" />
              <h3 className="text-sm font-medium">Phone</h3>
            </div>
            <a
              href={`tel:${selectedUser.phone}`}
              className="text-lg text-blue-600 hover:underline"
            >
              {selectedUser.phone}
            </a>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Globe className="w-4 h-4" />
              <h3 className="text-sm font-medium">Website</h3>
            </div>
            <a
              href={`https://${selectedUser.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-blue-600 hover:underline break-all"
            >
              {selectedUser.website}
            </a>
          </div>

          {/* City */}
          <div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <MapPin className="w-4 h-4" />
              <h3 className="text-sm font-medium">City</h3>
            </div>
            <p className="text-lg text-gray-900">{selectedUser.address?.city || 'N/A'}</p>
          </div>

          {selectedUser.address && (
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <MapPin className="w-4 h-4" />
                <h3 className="text-sm font-medium">Full Address</h3>
              </div>
              <p className="text-gray-900">
                {selectedUser.address.street}, {selectedUser.address.suite}
                <br />
                {selectedUser.address.city}, {selectedUser.address.zipcode}
              </p>
            </div>
          )}

          {selectedUser.company && (
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Building2 className="w-4 h-4" />
                <h3 className="text-sm font-medium">Company</h3>
              </div>
              <div className="text-gray-900">
                <p className="font-semibold">{selectedUser.company.name}</p>
                <p className="text-sm text-gray-600">{selectedUser.company.catchPhrase}</p>
              </div>
            </div>
          )}
        </div>

        <hr className="my-8" />

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Posts ({posts.length})
          </h2>

          {postLoading ? (
            <LoadingSpinner size="sm" text="Loading posts..." />
          ) : postError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{postError}</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{post.body}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">No posts found for this user</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};