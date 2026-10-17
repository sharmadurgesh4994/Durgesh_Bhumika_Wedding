import React, { useState, useEffect } from 'react';
import { GalleryImage } from '../types/wedding';
import { useAuth } from '../context/AuthContext';
import {
  subscribeToGallery,
  saveGalleryPhoto,
  removeGalleryPhoto,
} from '../services/weddingDb';
import { Plus, Trash2, X, ZoomIn, Lock, Image as ImageIcon, Upload, Sparkles, AlertTriangle, Check } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const { isAdmin, openAuthModal } = useAuth();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In-app delete confirmation state
  const [photoToDelete, setPhotoToDelete] = useState<GalleryImage | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New photo form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<GalleryImage['category']>('Pre-Wedding');
  const [newDescription, setNewDescription] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const [uploadError, setUploadError] = useState('');

  // Real-time Cloud Firestore synchronization across all users & devices
  useEffect(() => {
    const unsubscribe = subscribeToGallery((livePhotos) => {
      setImages(livePhotos);
    });
    return () => unsubscribe();
  }, []);

  const categories = ['All', 'Pre-Wedding', 'Haldi', 'Mandap', 'Bindoli', 'Vivah', 'Reception'];

  const filteredImages = images.filter((img) => {
    if (activeCategory === 'All') return true;
    return img.category === activeCategory;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle local file selection with client-side image compression
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress image so it uploads cleanly and fast to Firestore
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const scaleSize = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = img.width * scaleSize;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setPreviewDataUrl(compressedDataUrl);
        } else {
          setPreviewDataUrl(event.target?.result as string);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = previewDataUrl || imageUrlInput.trim();

    if (!finalUrl) {
      setUploadError('Please choose an image file or enter an image URL.');
      return;
    }

    setIsSubmitting(true);
    const newPhoto: GalleryImage = {
      id: 'img-' + Date.now(),
      title: newTitle.trim() || `${newCategory} Moment`,
      category: newCategory,
      imageUrl: finalUrl,
      dateAdded: 'Added by Host',
      description: newDescription.trim() || undefined,
    };

    try {
      await saveGalleryPhoto(newPhoto);
      setIsAddModalOpen(false);
      setNewTitle('');
      setNewDescription('');
      setImageUrlInput('');
      setPreviewDataUrl('');
      setUploadError('');
      showToast('Photo added live! Visible to all users.');
    } catch (err) {
      console.error('Photo save error:', err);
      setUploadError('Failed to save photo to cloud. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerDelete = (img: GalleryImage, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!isAdmin) {
      openAuthModal();
      return;
    }
    setPhotoToDelete(img);
  };

  const confirmDeletePhoto = async () => {
    if (!photoToDelete) return;
    const targetId = photoToDelete.id;
    try {
      await removeGalleryPhoto(targetId);
      if (lightboxImage?.id === targetId) {
        setLightboxImage(null);
      }
      setPhotoToDelete(null);
      showToast('Photo deleted! Removed for all users.');
    } catch (err) {
      console.error('Delete photo error:', err);
      showToast('Failed to delete photo from cloud.');
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 bg-[#FAF5EB] relative border-b border-[#D4AF37]/30">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 p-3.5 rounded-xl bg-[#240409] text-[#FFF2B2] border border-[#D4AF37] shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C6208] block mb-1">
            Cherished Memories &amp; Visual Splendor
          </span>
          <h2 className="font-royal text-2xl sm:text-4xl font-bold text-[#3B0710] tracking-wide">
            Royal Photo Gallery
          </h2>
          <div className="my-3 flex items-center justify-center gap-3">
            <div className="h-[1px] w-14 bg-[#D4AF37]" />
            <span className="font-hindi text-[#D4AF37] text-base">॥ पावन स्मृतियाँ एवं छायाचित्र ॥</span>
            <div className="h-[1px] w-14 bg-[#D4AF37]" />
          </div>
          <p className="text-xs sm:text-sm text-[#78350F] max-w-xl mx-auto">
            Capturing romantic pre-wedding portraits in historic Udaipur and auspicious moments from the wedding ceremonies.
          </p>

          {/* Host Controls Banner / Button */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {isAdmin ? (
              <div className="inline-flex items-center gap-3 p-1.5 px-4 rounded-xl bg-gradient-to-r from-[#801323] to-[#5A0C17] text-[#FFF2B2] text-xs shadow-md">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#F5D77F]" />
                  Host Access Active (Durgesh Sharma)
                </span>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#240409] font-bold text-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Photos</span>
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="inline-flex items-center gap-1.5 text-xs text-[#8C6208] hover:text-[#3B0710] py-1.5 px-3.5 rounded-lg border border-[#D4AF37]/50 bg-[#FFFDF9] hover:bg-[#FFF8ED] transition-colors shadow-sm cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Host Login to Manage &amp; Delete Photos</span>
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#801323] text-[#FFF2B2] shadow-sm'
                    : 'bg-[#FFFDF9] text-[#78350F] hover:bg-[#F3E5AB]/40 border border-[#D4AF37]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFDF9] rounded-2xl border border-[#D4AF37]/30 p-8">
            <ImageIcon className="w-12 h-12 text-[#B8860B]/60 mx-auto mb-3" />
            <h4 className="font-royal text-lg font-bold text-[#3B0710] mb-1">
              No Photos in {activeCategory} Yet
            </h4>
            <p className="text-xs text-[#78350F] mb-4">
              Photos for this ceremony will be added as festivities unfold.
            </p>
            {isAdmin && (
              <button
                onClick={() => {
                  setNewCategory(activeCategory as GalleryImage['category']);
                  setIsAddModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#801323] text-[#FFF2B2] text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload First Photo in {activeCategory}</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setLightboxImage(img)}
                className="group relative rounded-2xl overflow-hidden bg-[#FFFDF9] border border-[#D4AF37]/40 shadow-md hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Container with 4:3 Aspect Ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#3B0710]/85 backdrop-blur-sm border border-[#D4AF37]/40 text-[10px] font-semibold text-[#FFF2B2]">
                    {img.category}
                  </div>

                  {/* Hover Overlay with Zoom Icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-2.5 rounded-full bg-[#FFFDF9]/90 text-[#3B0710] shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Host Delete Button - Prominent & Reliable */}
                  {isAdmin && (
                    <button
                      onClick={(e) => triggerDelete(img, e)}
                      title="Delete Photo (Host only)"
                      className="absolute top-3 right-3 p-2 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-xl transition-all hover:scale-110 active:scale-95 z-20 flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>

                {/* Details Footer */}
                <div className="p-4 bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EB]">
                  <h3 className="font-serif-royal font-bold text-base text-[#3B0710] group-hover:text-[#801323] transition-colors truncate">
                    {img.title}
                  </h3>
                  {img.description && (
                    <p className="text-xs text-[#78350F] mt-1 line-clamp-2">
                      {img.description}
                    </p>
                  )}
                  {img.dateAdded && (
                    <span className="text-[10px] text-[#8C6208] mt-2 block">
                      {img.dateAdded}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full rounded-2xl overflow-hidden bg-[#240409] border border-[#D4AF37]/60 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-[#FAF5EB] hover:text-[#D4AF37] transition-colors z-20 cursor-pointer"
              aria-label="Close image viewer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="relative flex-1 bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Lightbox Details Bar */}
            <div className="p-4 sm:p-5 bg-[#2E050D] border-t border-[#D4AF37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[#FAF5EB]">
              <div>
                <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider block">
                  {lightboxImage.category} Collection
                </span>
                <h3 className="font-serif-royal text-lg sm:text-xl font-bold text-[#FFF2B2]">
                  {lightboxImage.title}
                </h3>
                {lightboxImage.description && (
                  <p className="text-xs text-[#E8DCB8] mt-1 max-w-2xl">
                    {lightboxImage.description}
                  </p>
                )}
              </div>

              {isAdmin && (
                <button
                  onClick={() => triggerDelete(lightboxImage)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shrink-0 cursor-pointer transition-colors shadow-md"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Photo</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* In-App Delete Confirmation Modal */}
      {photoToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-[#FFFDF9] p-6 border-2 border-red-500/50 shadow-2xl text-[#2C1810]">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-red-200">
              <div className="p-2.5 rounded-full bg-red-100 text-red-600 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-royal text-lg font-bold text-red-900">
                  Delete Photo Confirmation
                </h3>
                <p className="text-xs text-[#8C6208]">
                  Host Action · Durgesh Sharma
                </p>
              </div>
            </div>

            <p className="text-xs text-[#5C2E0A] mb-4 leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-red-900">&ldquo;{photoToDelete.title}&rdquo;</strong>? This photo will be removed for everyone across all devices.
            </p>

            {photoToDelete.imageUrl && (
              <div className="mb-4 h-28 rounded-xl overflow-hidden bg-neutral-100 border border-[#D4AF37]/30">
                <img
                  src={photoToDelete.imageUrl}
                  alt="To delete"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPhotoToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-semibold text-xs hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeletePhoto}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete for Everyone</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Photo Modal for Host */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EB] p-6 sm:p-8 border border-[#D4AF37] shadow-2xl text-[#2C1810]">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#8C6208] hover:bg-[#F3E5AB]/40 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#D4AF37]/30">
              <Upload className="w-5 h-5 text-[#801323]" />
              <div>
                <h3 className="font-royal text-xl font-bold text-[#801323]">
                  Add Wedding / Pre-Wedding Photo
                </h3>
                <p className="text-xs text-[#8C6208]">
                  Cloud Sync Active · Visible to All Visitors Worldwide
                </p>
              </div>
            </div>

            {uploadError && (
              <div className="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-300 text-red-800 text-xs">
                {uploadError}
              </div>
            )}

            <form onSubmit={handleAddPhotoSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#5C2E0A] font-semibold mb-1">
                  Upload Photo from Phone / Computer
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-[#2C1810] file:mr-3 file:py-2 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#801323] file:text-[#FFF2B2] hover:file:bg-[#9B192C] cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 my-1">
                <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
                <span className="text-[10px] text-[#8C6208] uppercase">OR Enter Image URL</span>
                <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
              </div>

              <div>
                <input
                  type="url"
                  value={imageUrlInput}
                  onChange={(e) => {
                    setImageUrlInput(e.target.value);
                    if (e.target.value) setPreviewDataUrl('');
                  }}
                  placeholder="https://example.com/my-prewedding-photo.jpg"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FFFDF9] border border-[#D4AF37]/50 text-[#2C1810] focus:border-[#801323] focus:outline-none"
                />
              </div>

              {/* Preview */}
              {(previewDataUrl || imageUrlInput) && (
                <div className="p-2 rounded-xl bg-[#FFF8ED] border border-[#D4AF37]/40 flex items-center gap-3">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-neutral-200 shrink-0">
                    <img
                      src={previewDataUrl || imageUrlInput}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[11px] text-[#8C6208] font-medium truncate">
                    Ready to publish to cloud gallery
                  </span>
                </div>
              )}

              {/* Title / Caption */}
              <div>
                <label className="block text-[#5C2E0A] font-semibold mb-1">
                  Photo Title / Caption
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Haldi Sunshine in Kolyari"
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FFFDF9] border border-[#D4AF37]/50 text-[#2C1810] focus:border-[#801323] focus:outline-none"
                />
              </div>

              {/* Ceremony Category */}
              <div>
                <label className="block text-[#5C2E0A] font-semibold mb-1">
                  Ceremony Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as GalleryImage['category'])}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FFFDF9] border border-[#D4AF37]/50 text-[#2C1810] focus:border-[#801323] focus:outline-none"
                >
                  <option value="Pre-Wedding">Pre-Wedding Shoot (Udaipur)</option>
                  <option value="Haldi">Haldi Ceremony</option>
                  <option value="Mandap">Mandap &amp; Mayra</option>
                  <option value="Bindoli">Bindoli Procession</option>
                  <option value="Vivah">Wedding (Saat Phere)</option>
                  <option value="Reception">Royal Reception</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#5C2E0A] font-semibold mb-1">
                  Short Description (Optional)
                </label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="e.g. Captured in Udaipur with family..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FFFDF9] border border-[#D4AF37]/50 text-[#2C1810] focus:border-[#801323] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#801323] to-[#5A0C17] text-[#FFF2B2] font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? (
                    <span>Uploading...</span>
                  ) : (
                    <span>Publish for All Users</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
