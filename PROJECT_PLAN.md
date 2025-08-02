# Mini LinkedIn-like Community Platform - Project Plan

## Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript + Tailwind CSS + Zustand
- **Backend**: Firebase (Authentication, Firestore Database, Hosting)
- **Deployment**: Vercel

## Project Structure

```
mini-linkedin/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── profile/
│   │   └── [userId]/
│   │       └── page.tsx
│   ├── components/
│   │   ├── AuthForm.tsx
│   │   ├── PostCard.tsx
│   │   ├── PostForm.tsx
│   │   ├── ProfileCard.tsx
│   │   └── Navbar.tsx
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── auth.ts
│   │   └── firestore.ts
│   ├── store/
│   │   └── authStore.ts
│   ├── layout.tsx
│   └── page.tsx (Home/Feed)
├── public/
└── README.md
```

## Development Steps

### Phase 1: Firebase Setup & Authentication (Priority 1)

1. **Setup Firebase Configuration**

   - Create `lib/firebase.ts` with proper Firebase initialization
   - Setup Firebase Auth and Firestore

2. **Create Authentication Store**

   - `store/authStore.ts` using Zustand for managing user state globally
   - Handle login, logout, and user persistence

3. **Build Auth Pages**

   - `app/auth/login/page.tsx` - Login form
   - `app/auth/signup/page.tsx` - Registration form
   - Basic forms with email/password validation

4. **Auth Protection**
   - Middleware or route protection for authenticated pages
   - Redirect logic between auth and protected pages

### Phase 2: User Profile System (Priority 2)

5. **User Profile Creation**

   - Extend registration to include name, bio
   - Store user profiles in Firestore

6. **Profile Display**
   - `app/profile/[userId]/page.tsx` - View user profiles
   - `components/ProfileCard.tsx` - Reusable profile component

### Phase 3: Post System (Priority 3)

7. **Post Creation**

   - `components/PostForm.tsx` - Create new posts
   - Store posts in Firestore with author info and timestamps

8. **Post Display**

   - `components/PostCard.tsx` - Individual post component
   - Home feed displaying all posts with author names and timestamps

9. **Post Management**
   - Link posts to user profiles
   - Display user's posts on their profile page

### Phase 4: Navigation & Layout (Priority 4)

10. **Navigation System**

    - `components/Navbar.tsx` - Main navigation
    - Links to home, profile, logout functionality

11. **Layout Updates**
    - Update `app/layout.tsx` with proper structure
    - Responsive design considerations

### Phase 5: UI Enhancement (Priority 5)

12. **Styling & Responsiveness**

    - Improve UI with Tailwind CSS
    - Mobile-responsive design
    - Professional LinkedIn-like appearance

13. **User Experience**
    - Loading states
    - Error handling
    - Form validation feedback

### Phase 6: Deployment & Documentation (Priority 6)

14. **Deployment**

    - Deploy to Vercel
    - Environment variables setup

15. **Documentation**
    - Complete README.md
    - Setup instructions
    - Demo user credentials

## Firebase Collections Structure

### Users Collection

```javascript
users: {
  [userId]: {
    name: string,
    email: string,
    bio: string,
    createdAt: timestamp
  }
}
```

### Posts Collection

```javascript
posts: {
  [postId]: {
    content: string,
    authorId: string,
    authorName: string,
    createdAt: timestamp
  }
}
```

## Key Features Implementation Order

1. ✅ User Registration/Login with email & password
2. ✅ User profile creation (name, email, bio)
3. ✅ Create and display text posts
4. ✅ Home feed with posts, author names, timestamps
5. ✅ User profile pages showing their posts
6. ✅ Basic navigation between pages
7. ✅ Responsive design
8. ✅ Deployment

## Estimated Timeline

- **Phase 1-2**: 4-6 hours (Auth + Profiles)
- **Phase 3**: 3-4 hours (Posts system)
- **Phase 4-5**: 3-4 hours (Navigation + UI)
- **Phase 6**: 1-2 hours (Deployment + Docs)
- **Total**: 11-16 hours

## Next Steps

1. Review this plan and approve
2. Start with Phase 1: Firebase setup and basic login/signup pages
3. Test authentication flow before moving to next phase
4. Iterate through each phase with functionality testing
5. Focus on UI/UX improvements after core features work

Would you like me to proceed with Phase 1 (Firebase setup and authentication) once you approve this plan?
