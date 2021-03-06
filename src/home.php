<?php
/**
 * The home page template file.
 *
 * @package Cucina
 */

get_header(); ?>

	<?php if ( ! is_paged() ) : ?>
		<!-- Pull out the first post, and display it large -->
		<?php if ( have_posts() ) : the_post(); ?>
			<?php get_template_part( 'content', 'featured' ); ?>
		<?php endif; ?>
	<?php endif; ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php if ( have_posts() ) : ?>

				<div id="masonry">
				<?php /* Start the Loop */ ?>
				<?php while ( have_posts() ) : the_post(); ?>

					<?php
						/* Include the Post-Format-specific template for the content.
						 * If you want to override this in a child theme, then include a file
						 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
						 */
						get_template_part( 'content', get_post_format() );
					?>

				<?php endwhile; ?>
				</div>

				<?php cucina_paging_nav(); ?>

			<?php else : ?>

				<?php get_template_part( 'content', 'none' ); ?>

			<?php endif; ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
