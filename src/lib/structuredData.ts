export function generateArticleStructuredData({
    title,
    description,
    url,
    image,
    publishedTime,
    modifiedTime,
    author = "Tim Varley",
    tags = []
}: {
    title: string;
    description: string;
    url: string;
    image?: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "url": url,
        "image": image ? [image] : undefined,
        "datePublished": publishedTime,
        "dateModified": modifiedTime,
        "author": {
            "@type": "Person",
            "name": author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Tim Varley",
            "logo": {
                "@type": "ImageObject",
                "url": "https://tvarley.github.io/images/logo.png" // Update with actual logo
            }
        },
        "keywords": tags.join(", ")
    };
}

export function generateTechArticleStructuredData({
    title,
    description,
    url,
    image,
    publishedTime,
    modifiedTime,
    author = "Tim Varley",
    tags = []
}: {
    title: string;
    description: string;
    url: string;
    image?: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": title,
        "description": description,
        "url": url,
        "image": image ? [image] : undefined,
        "datePublished": publishedTime,
        "dateModified": modifiedTime,
        "author": {
            "@type": "Person",
            "name": author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Tim Varley"
        },
        "keywords": tags.join(", "),
        "proficiencyLevel": "Advanced"
    };
}

export function generateProjectStructuredData({
    title,
    description,
    url,
    image,
    tags = []
}: {
    title: string;
    description: string;
    url: string;
    image?: string;
    tags?: string[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": title,
        "description": description,
        "url": url,
        "image": image ? [image] : undefined,
        "keywords": tags.join(", "),
        "creator": {
            "@type": "Person",
            "name": "Tim Varley"
        }
    };
}