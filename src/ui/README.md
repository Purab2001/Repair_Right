# Reusable UI Components Documentation

This documentation explains how to use the refactored reusable UI components in the RepairRight project.

## Alert Component

The `Alert` component provides a standardized way to display success, error, warning, and info messages.

### Usage

```jsx
import Alert from '../ui/Alert';

// Basic usage
<Alert type="error" message="Something went wrong!" />
<Alert type="success" message="Operation completed successfully!" />
<Alert type="warning" message="Please check your input" />
<Alert type="info" message="Here's some helpful information" />

// With custom styling and size
<Alert
  type="error"
  message="Error message"
  className="mb-6"
  size="sm"
  animated={true}
/>
```

### Props

- `type`: 'error' | 'success' | 'warning' | 'info' (default: 'info')
- `message`: string - The message to display (required)
- `className`: string - Additional CSS classes (default: '')
- `animated`: boolean - Whether to show animation (default: true)
- `size`: 'sm' | 'md' | 'lg' - Size of the alert (default: 'md')

## Modal Component

The `Modal` component provides a reusable modal dialog with consistent styling.

### Usage

```jsx
import Modal from "../ui/Modal";

<Modal
  isOpen={showModal}
  onClose={handleClose}
  title="Modal Title"
  maxWidth="max-w-4xl"
>
  <p>Modal content goes here</p>
  <form>{/* form content */}</form>
</Modal>;

// With custom title (JSX)
const customTitle = (
  <div className="flex items-center gap-3">
    <FiEdit className="text-primary" />
    Custom Title
  </div>
);

<Modal isOpen={isOpen} onClose={onClose} title={customTitle}>
  {/* content */}
</Modal>;
```

### Props

- `isOpen`: boolean - Whether the modal is open (required)
- `onClose`: function - Callback when modal should close (required)
- `title`: string | JSX.Element - Modal title
- `children`: JSX.Element - Modal content (required)
- `maxWidth`: string - Maximum width class (default: 'max-w-4xl')
- `showCloseButton`: boolean - Whether to show X button (default: true)
- `className`: string - Additional CSS classes (default: '')

## ServiceCard Component

The `ServiceCard` component is a unified card component for displaying services with different variants.

### Usage

```jsx
import ServiceCard from '../ui/ServiceCard';

// Default variant (for Services page)
<ServiceCard service={serviceObject} />

// Popular services variant
<ServiceCard
  service={serviceObject}
  variant="popular"
  onSeeMore={() => handleSeeMore(service._id)}
/>

// Compact variant
<ServiceCard
  service={serviceObject}
  variant="compact"
  className="custom-class"
/>
```

### Props

- `service`: object - Service data object (required)
- `variant`: 'default' | 'popular' | 'compact' - Display variant (default: 'default')
- `onSeeMore`: function - Callback for "See More" button (popular variant)
- `className`: string - Additional CSS classes (default: '')

### Service Object Structure

The component expects a service object with the following structure:

```javascript
{
  _id: "service-id",           // or id
  name: "Service Name",        // or serviceName
  description: "Description",
  price: "৳500",
  imageUrl: "image-url",
  area: "Service Area",        // optional
  provider: {                  // optional
    email: "provider@email.com"
  }
}
```

## Icon Component

The `Icon` component centralizes SVG icons for consistent usage across the application.

### Usage

```jsx
import Icon from '../ui/Icon';

<Icon name="error" />
<Icon name="success" size="w-8 h-8" />
<Icon name="warning" className="text-yellow-500" />
```

### Props

- `name`: string - Icon name (required)
- `className`: string - Additional CSS classes (default: '')
- `size`: string - Size classes (default: 'w-6 h-6')

### Available Icons

- `error` - Error/alert circle icon
- `success` - Success checkmark icon
- `warning` - Warning triangle icon
- `info` - Information circle icon
- `user` - User profile icon
- `calendar` - Calendar icon

## Migration Guide

### Replacing old Alert patterns:

**Before:**

```jsx
{
  error && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="alert alert-error"
    >
      <svg>...</svg>
      <span>{error}</span>
    </motion.div>
  );
}
```

**After:**

```jsx
<Alert type="error" message={error} />
```

### Replacing old Modal patterns:

**Before:**

```jsx
<div className="modal modal-open">
  <div className="modal-box max-w-4xl w-full relative max-h-[90vh] overflow-y-auto bg-base-200 shadow-2xl">
    <button onClick={onClose} className="...">
      <FiX />
    </button>
    <h3>Title</h3>
    {/* content */}
  </div>
  <div
    className="modal-backdrop bg-black/50 backdrop-blur-sm"
    onClick={onClose}
  />
</div>
```

**After:**

```jsx
<Modal isOpen={isOpen} onClose={onClose} title="Title">
  {/* content */}
</Modal>
```

### Replacing ServiceCard variants:

**Before:**

```jsx
<ServiceCard
  imageUrl={service.imageUrl}
  serviceName={service.serviceName}
  description={service.description}
  price={service.price}
  onSeeMore={handleSeeMore}
/>
```

**After:**

```jsx
<ServiceCard service={service} variant="popular" onSeeMore={handleSeeMore} />
```

## Benefits

1. **Consistency**: All alerts, modals, and cards have consistent styling and behavior
2. **Maintainability**: Changes to styling or behavior only need to be made in one place
3. **Reusability**: Components can be easily used across different pages
4. **Type Safety**: Clear prop interfaces make components easier to use correctly
5. **Accessibility**: Centralized components can implement accessibility features consistently
6. **Bundle Size**: Eliminates duplicate code and unused SVG icons
